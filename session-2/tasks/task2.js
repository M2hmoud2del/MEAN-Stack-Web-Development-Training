function pingServer() {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (Math.random() > 0.5) {
                resolve("Server is Online");
            } else {
                reject("Server is Offline");
            }

        }, 1000);

    });
}

async function checkServer() {

    for (let i = 1; i <= 5; i++) {

        try {

            console.log(`Attempt ${i}`);

            const result = await pingServer();

            console.log(result);

            break;

        } catch (error) {

            console.log(error);

            if (i === 5) {
                console.log("Failed to connect after 5 attempts.");
            }

        }

    }

}

checkServer();
