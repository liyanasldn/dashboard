function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}



//Table

document.addEventListener("DOMContentLoaded", function () {
    const products = [
        { id: 1, name: "Product A", price: "RM100", status: "Available", image: "./img/chair.jpg" },
        { id: 2, name: "Product B", price: "RM200", status: "Unavailable", image: "./img/chair-two.jpg" },
        { id: 3, name: "Product C", price: "RM150", status: "Available", image: "./img/chair-three.jpg" },
        { id: 4, name: "Product D", price: "RM50", status: "Unavailable", image: "./img/chair-four.jpg" }
    ];

    const tbody = document.getElementById("product-tbody");

    // Function to render product data
    function renderTable(data) {
        tbody.innerHTML = ""; // Clear current rows
        data.forEach(product => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.status}</td>
                <td><button class="view-btn" data-id="${product.id}">View</button></td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Render initial table
    renderTable(products);

    // Sorting by name
    let sortAscending = true;
    document.getElementById("name-header").addEventListener("click", function () {
        sortAscending = !sortAscending;
        products.sort((a, b) => {
            if (a.name < b.name) return sortAscending ? -1 : 1;
            if (a.name > b.name) return sortAscending ? 1 : -1;
            return 0;
        });
        renderTable(products);
    });

    // Show modal with product details
    const modal = document.getElementById("product-modal");
    const closeModal = document.getElementById("close-modal");

    tbody.addEventListener("click", function (e) {
        if (e.target.classList.contains("view-btn")) {
            const productId = e.target.getAttribute("data-id");
            const product = products.find(p => p.id == productId);
            document.getElementById("product-details").innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
                <div style="width: 100%;">
                    <img src="${product.image}" alt="${product.name}" style="width: 100%; height: auto; border-radius:10px;">
                </div>
                <div class="modal-text" style="width: 100%;">
                    <p><strong>ID:</strong> ${product.id}</p>
                    <p><strong>Name:</strong> ${product.name}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Status:</strong> ${product.status}</p>
                </div>
            </div>
`;

            modal.style.display = "block";
        }
    });

    // Close modal
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
