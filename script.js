let dogs = [];

function addDog() {
    const name = document.getElementById("dogName").value;
    const duration = document.getElementById("duration").value;
    
    if (name && duration) {
        // Calculate the end time by adding the duration in milliseconds
        const endTime = new Date().getTime() + (duration * 24 * 60 * 60 * 1000); // duration in days
        
        // Store the start time and end time
        const startTime = new Date().getTime();

        const dog = {
            name,
            duration,
            endTime,
            startTime
        };

        dogs.push(dog);
        document.getElementById("dogName").value = '';
        document.getElementById("duration").value = '';
        renderDogs();
    }
}

function deleteDog(index) {
    dogs.splice(index, 1);
    renderDogs();
}

function renderDogs() {
    const dogList = document.getElementById("dogList");
    dogList.innerHTML = '';

    dogs.forEach((dog, index) => {
        const now = new Date().getTime();
        const timeLeft = dog.endTime - now; // Calculate the time left from now

        let displayTime = '';
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            // If it's the first day, show 24h 00m 00s
            if (days === dog.duration) {
                displayTime = `${days} day(s) (${hours === 0 ? 24 : hours}h ${minutes === 0 ? 0 : minutes}m ${seconds === 0 ? 0 : seconds}s)`;
            } else if (days > 0) {
                displayTime = `${days} day(s) (${hours}h ${minutes}m ${seconds}s)`;
            } else {
                displayTime = `${hours}h ${minutes}m ${seconds}s`;
            }
        } else {
            displayTime = "Times Up!";
        }

        const dogItem = document.createElement("div");
        dogItem.classList.add("dog-item");
        dogItem.innerHTML = `
            <span>${dog.name} - ${displayTime}</span>
            <button class="delete-btn" onclick="deleteDog(${index})"><i class="fas fa-trash-alt"></i></button>
        `;
        dogList.appendChild(dogItem);
    });
}

// Update the countdown every second
setInterval(renderDogs, 1000);
