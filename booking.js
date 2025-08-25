const mainService = document.getElementById('main-service');
const subContainer = document.getElementById('sub-services-container');
const bookBtn = document.getElementById('book-btn');
const confirmation = document.getElementById('confirmation');

const services = {
    personal: [
        { name: "One-on-One Training", price: "$50" },
        { name: "Strength Training", price: "$60" },
        { name: "Cardio Session", price: "$40" }
    ],
    group: [
        { name: "Yoga Class", price: "$20" },
        { name: "Zumba Class", price: "$25" },
        { name: "HIIT Class", price: "$30" }
    ],
    nutrition: [
        { name: "Basic Plan", price: "$30" },
        { name: "Advanced Plan", price: "$50" },
        { name: "Premium Plan", price: "$80" }
    ]
};

mainService.addEventListener('change', () => {
    subContainer.innerHTML = '';
    const selected = mainService.value;
    if (services[selected]) {
        services[selected].forEach((sub, index) => {
            const div = document.createElement('div');
            div.classList.add('sub-service');
            div.innerHTML = `
                <span>${sub.name}</span>
                <span>${sub.price}</span>
                <input type="radio" name="sub-service" value="${sub.name}" required>
            `;
            subContainer.appendChild(div);
        });
    }
});

bookBtn.addEventListener('click', () => {
    const appointment = document.getElementById('appointment').value;
    const contact = document.getElementById('contact').value;
    const subSelected = document.querySelector('input[name="sub-service"]:checked');

    if (!mainService.value || !subSelected || !appointment || !contact) {
        alert("Please fill all fields!");
        return;
    }

    const bookedService = subSelected.value;
    const bookedTime = appointment;
    const bookedContact = contact;

    confirmation.innerHTML = `
        <p>Booked successfully, thank you for choosing Power Fit!</p>
        <p>We have sent a related text via ${bookedContact}.</p>
        <button onclick="printReceipt()">Download / Print Receipt</button>
    `;
});

function printReceipt() {
    const service = document.querySelector('input[name="sub-service"]:checked').value;
    const appointment = document.getElementById('appointment').value;
    const contact = document.getElementById('contact').value;

    const receipt = `
        <html>
        <head><title>Power Fit Receipt</title></head>
        <body>
            <h1>Power Fit Receipt</h1>
            <p>Service: ${service}</p>
            <p>Appointment: ${appointment}</p>
            <p>Contact: ${contact}</p>
            <p>Thank you for booking with us!</p>
        </body>
        </html>
    `;
    const win = window.open("", "_blank");
    win.document.write(receipt);
    win.document.close();
    win.print();
}
