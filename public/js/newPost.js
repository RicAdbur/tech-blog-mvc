const newPostTitleInput = document.getElementById("newPostTitleInput");
const newPostTextInput = document.getElementById("newPostTextInput");
const newPostSubmitButton = document.getElementById("newPostSubmit");

console.log(newPostTitleInput, newPostTextInput, newPostSubmitButton)

const createPost = async (event) => {
  event.preventDefault()

  const title = newPostTitleInput.value.trim()
  const text = newPostTextInput.value.trim()

  if (title && text) {
    await fetch("/api/blogPosts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        text,
      })
    })
    .then(response => {
      console.log(response)
      if (response.status === 200) {
        window.location.assign("/dashboard")
      }
    })
    .catch(err => console.error(err))
  }
};

newPostSubmitButton.addEventListener("click", createPost);