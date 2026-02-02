// 1. 模擬後端資料庫 (未來這裡會改成從 Server 抓取)
const mockDatabase = {
    "P001": {
        name: "極品玉女小番茄",
        farmer: "陳大農",
        location: "嘉義縣太保市",
        harvestDate: "2026-02-01",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800",
        history: [
            { date: "2026-02-01", action: "人工採收與分級" },
            { date: "2026-01-15", action: "果實甜度檢測 (Brix 12)" },
            { date: "2025-12-20", action: "有機液態肥施用" }
        ]
    },
    "P002": {
        name: "冠軍愛文芒果",
        farmer: "林阿水",
        location: "台南市玉井區",
        harvestDate: "2026-05-20",
        image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800",
        history: [
            { date: "2026-05-20", action: "在欉紅採收" },
            { date: "2026-04-10", action: "套袋保護" }
        ]
    }
};

// 2. 程式開始執行：取得網址上的參數
// 網址長這樣：index.html?id=P001
const params = new URLSearchParams(window.location.search);
const productId = params.get('id'); // 抓取 P001

// 3. 顯示資料的函數
function renderPage(id) {
    const data = mockDatabase[id];

    // 如果找不到資料
    if (!data) {
        document.body.innerHTML = "<h2 style='text-align:center; padding:50px;'>查無此履歷資料，請確認 QR Code 是否正確。</h2>";
        return;
    }

    // 填入資料到 HTML
    document.getElementById('product-name').textContent = data.name;
    document.getElementById('farmer-name').textContent = data.farmer;
    document.getElementById('location').textContent = data.location;
    document.getElementById('harvest-date').textContent = data.harvestDate;
    document.getElementById('batch-id').textContent = id;
    document.getElementById('product-img').src = data.image;

    // 填入時間軸
    const timelineBox = document.getElementById('timeline-box');
    let timelineHTML = "";
    
    data.history.forEach(item => {
        timelineHTML += `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="date">${item.date}</div>
                <p class="action">${item.action}</p>
            </div>
        `;
    });
    
    timelineBox.innerHTML = timelineHTML;
}

// 4. 執行
// 如果網址沒有 ID，我們先預設顯示 P001 讓你看效果
if (productId) {
    renderPage(productId);
} else {
    console.log("未偵測到 ID，使用預設資料");
    renderPage("P001"); 
}