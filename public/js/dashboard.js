

const deleteButtons = document.querySelectorAll(".btn-delete");

for (const deleteButton of deleteButtons) {
  deleteButton.addEventListener("click", function(event) {
    event.preventDefault()
    const postID = event.target.dataset.id


    fetch(`/api/blogPosts/delete/${postID}`, {
      method: "DELETE",
    })
    .then(response => {
      if (response.status === 200) {
        window.location.reload()
      }
    })
    .catch(err => console.error(err))
  })
};