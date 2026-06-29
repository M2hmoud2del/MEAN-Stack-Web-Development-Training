const bookedSlots = ["a1", "b3"];

function bookAppointment(slot) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (bookedSlots.includes(slot)) {
                reject("This slot is already booked.");
            } else {
                resolve(`Appointment booked successfully for slot ${slot}`);
            }

        }, 2000);

    });
}

async function book(slot) {
    try {
        const result = await bookAppointment(slot);
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

book("b2"); // Success
book("a1"); // This slot is already booked.
