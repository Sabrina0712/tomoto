const yourSheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQInxkTBdo75DOMbUI_-MWYPeHlR6mH_wOrrARxP_RRagbOBal6oeIWsnu6Izr1I6E_F7aMHAYp1Deq/pub?output=csv';

function init() {
    if (document.getElementById('product-name')) {
        loadProductPage(); 
    } else if (document.getElementById('farmer-title')) {
        loadFarmerPage();  
    } else if (document.getElementById('searchInput')) {
        console.log("首頁待命中");
    }
}


function loadProductPage() {
    const params = new URLSearchParams(window.location.search);
    const targetId = params.get('id');

    if (!targetId) return;

    Papa.parse(yourSheetUrl, {
        download: true,
        header: true,
        complete: function(results) {
            const allData = results.data;
            const product = allData.find(item => item.id === targetId);
            if (product) renderProduct(product);
        }
    });
}

function renderProduct(data) {
    document.getElementById('product-name').textContent = data.name;
    const farmerLink = `<a href="farmer.html?name=${data.farmer}" style="text-decoration:none; color:#059669;">${data.farmer} 🔗</a>`;
    document.getElementById('farmer-name').innerHTML = farmerLink;
    
    document.getElementById('location').textContent = data.location;
    document.getElementById('harvest-date').textContent = data.harvestDate;
    document.getElementById('batch-id').textContent = data.id;
    document.getElementById('product-img').src = data.image;

    const timelineBox = document.getElementById('timeline-box');
    let timelineHTML = "";
    for (let i = 1; i <= 3; i++) {
        if (data[`date${i}`] && data[`action${i}`]) {
            timelineHTML += `
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="date">${data[`date${i}`]}</div>
                    <p class="action">${data[`action${i}`]}</p>
                </div>`;
        }
    }
    timelineBox.innerHTML = timelineHTML;
}


function loadFarmerPage() {
    const params = new URLSearchParams(window.location.search);
    const targetFarmer = params.get('name');

    if (!targetFarmer) {
        document.getElementById('farmer-title').textContent = "未指定農夫";
        return;
    }

    document.getElementById('farmer-title').textContent = targetFarmer + " 的農場";

    Papa.parse(yourSheetUrl, {
        download: true,
        header: true,
        complete: function(results) {
            const allData = results.data;
            
        
            const myProducts = allData.filter(item => item.farmer === targetFarmer);
            
            const listContainer = document.getElementById('farmer-products-list');
            
            if (myProducts.length === 0) {
                listContainer.innerHTML = "<p>目前沒有上架產品。</p>";
                return;
            }

       
            let html = "";
            myProducts.forEach(prod => {
                html += `
                <div class="product-card" onclick="location.href='product.html?id=${prod.id}'" style="background:white; padding:15px; margin-bottom:15px; border-radius:10px; display:flex; align-items:center; box-shadow:0 2px 5px rgba(0,0,0,0.05); cursor:pointer;">
                    <img src="${prod.image}" style="width:60px; height:60px; border-radius:8px; object-fit:cover; margin-right:15px;">
                    <div>
                        <h4 style="margin:0;">${prod.name}</h4>
                        <span style="font-size:12px; color:#6b7280;">批號：${prod.id} | ${prod.harvestDate} 採收</span>
                    </div>
                </div>
                `;
            });
            
            listContainer.innerHTML = html;
        }
    });
}

init();
