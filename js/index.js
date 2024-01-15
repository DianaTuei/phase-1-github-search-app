document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#github-form').addEventListener('submit',(e) => {
        e.preventDefault()
        const searchValue = e.target.search.value
        searchId(searchValue)
    })
})

function searchId(searchValue){
    fetch(`https://api.github.com/users/${searchValue}`)
    .then(res => res.json())
    .then(users =>{
        displayUser(users)
        displayRepos(users.repos_url)
    })

}

function displayUser(users){
    let list = document.querySelector('ul#user-list')
    let userCard = document.createElement('div')
    userCard.innerHTML = `
    <h2>Name: ${users.name}<h2>
    <img src="${users.avatar_url}"/>
    <p>Profile link: <a href = "${users.html_url}">See Profile </a> </p>
    `

    list.innerHTML = ''
    list.appendChild(userCard)

}

function displayRepos(repos_url){
    fetch(repos_url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        let lists = document.querySelector('#repos-list')
        let repoCard = document.createElement('div')
        repoCard.innerHTML = `
        <strong> Repository Names:</strong>
        <br> `
        lists.appendChild(repoCard)

        data.forEach(repo => {
            let repoList = document.createElement('li')
            repoList.innerText = repo.name
            repoCard.appendChild(repoList)
        })
        
    })
}


