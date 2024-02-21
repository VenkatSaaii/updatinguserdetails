function handleFormSubmit(event) {
    event.preventDefault();
    const UserDetails = {
        username: event.target.username.value,
        email: event.target.email.value,
        phone: event.target.phone.value
    };

    axios
        .post("https://crudcrud.com/api/f7e28f09371a4182bdc7c4d046e774a9/appointment", UserDetails)
        .then((res) => {
            showDisplayOnScreen(res.data);

            // Clear the input fields
            document.getElementById('username').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '';
        })
        .catch((error) => console.log(error));
}

window.addEventListener('DOMContentLoaded', () => {
    axios
        .get("https://crudcrud.com/api/f7e28f09371a4182bdc7c4d046e774a9/appointment")
        .then((res) => {
            for (var i = 0; i < res.data.length; i++) {
                showDisplayOnScreen(res.data[i]);
            }
        })
        .catch((error) => {
            console.log(error);
        });
});

function showDisplayOnScreen(UserDetails) {
    const newli = document.createElement('li');
    newli.appendChild(
        document.createTextNode(`${UserDetails.username} - ${UserDetails.email} - ${UserDetails.phone}`)
    );

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        axios
            .delete(`https://crudcrud.com/api/f7e28f09371a4182bdc7c4d046e774a9/appointment/${UserDetails._id}`)
            .then((res) => {
                localStorage.removeItem(UserDetails.email);
                newli.remove();
            })
            .catch((error) => console.log(error));
    });

    // Create edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function () {
        document.getElementById('username').value = UserDetails.username;
        document.getElementById('email').value = UserDetails.email;
        document.getElementById('phone').value = UserDetails.phone;

        const submitEditButton = document.createElement('button');
        submitEditButton.textContent = 'Submit Edit';
        submitEditButton.addEventListener('click', function () {
            axios
                .delete(`https://crudcrud.com/api/f7e28f09371a4182bdc7c4d046e774a9/appointment/${UserDetails._id}`)
                .then((res) => {
                    localStorage.removeItem(UserDetails.email);
                    newli.remove();

                    const updatedUserDetails = {
                        username: document.getElementById('username').value,
                        email: document.getElementById('email').value,
                        phone: document.getElementById('phone').value
                    };
                    axios
                        .post("https://crudcrud.com/api/f7e28f09371a4182bdc7c4d046e774a9/appointment", updatedUserDetails)
                        .then((res) => {
                            showDisplayOnScreen(res.data);
                        })
                        .catch((error) => console.log(error));
                })
                .catch((error) => console.log(error));
        });

        newli.replaceChild(submitEditButton, editButton);
    });

    newli.appendChild(deleteButton);
    newli.appendChild(editButton);

    const list = document.querySelector('ul');
    list.appendChild(newli);
}

module.exports = handleFormSubmit;