const BASE_URL = 'https://jsonplaceholder.typicode.com';

let usersDivEl;
let postsDivEl;
let loadButtonEl;
let commentsDivEl;
let albumsDivEl;
let photosDivEl;

function createPostsList(posts) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        const postIdAttr = document.createAttribute('data-post-id');
        postIdAttr.value = post.id;

        const buttonEl = document.createElement('button');
        buttonEl.textContent = post.title;
        buttonEl.setAttributeNode(postIdAttr);
        buttonEl.addEventListener('click', onLoadComments);
        document.getElementById('albums').style.display = 'none';
        document.getElementById('comments').style.display = 'none';
        document.getElementById('photos').style.display = 'none';

        const pEl = document.createElement('p');
        pEl.appendChild(buttonEl);
        pEl.appendChild(document.createTextNode(`: ${post.body}`));

        const liEl = document.createElement('li');
        liEl.appendChild(pEl);

        ulEl.appendChild(liEl);
    }

    return ulEl;
}

function onPostsReceived() {
    postsDivEl.style.display = 'block';

    const text = this.responseText;
    const posts = JSON.parse(text);

    const divEl = document.getElementById('posts-content');
    const commentsDivEl = document.getElementById('comments-content');

    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createPostsList(posts));
}

function onLoadPosts() {
    const el = this;
    const userId = el.getAttribute('data-user-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPostsReceived);
    xhr.open('GET', BASE_URL + '/posts?userId=' + userId);
    xhr.send();
}

function createPhotosList(photos) {
    const ulEl = document.createElement('ul');

    for(let i = 0; i < photos.length; i++) {
        const photo = photos[i];

        // creating paragraph
        const pEl = document.createElement('p');
        pEl.textContent = photo.url;

        // creating photo's link
        const aEl = document.createElement('a');
        aEl.setAttribute('href', photo.url);
        aEl.appendChild(pEl);
        
        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(aEl);

        ulEl.appendChild(liEl);
    }

    return ulEl;
}

function onPhotosReceived() {
    photosDivEl.style.display = 'block';

    const text = this.responseText;
    const photos = JSON.parse(text);

    const divEl = document.getElementById('photos-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createPhotosList(photos));
}

function onLoadPhotos() {
    const el = this;
    const albumId = el.getAttribute('data-album-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPhotosReceived);
    xhr.open('GET', BASE_URL + '/photos?albumId=' + albumId);
    xhr.send();
}

function createAlbumsList(albums) {
    const ulEl = document.createElement('ul');

    for(let i = 0; i < albums.length; i++) {
        const album = albums[i];

        const dataAlbumIdAttr = document.createAttribute('data-album-id');
        dataAlbumIdAttr.value = album.id;

        const buttonEl = document.createElement('button');
        buttonEl.textContent = album.title;
        buttonEl.setAttributeNode(dataAlbumIdAttr);
        buttonEl.addEventListener('click', onLoadPhotos);

        document.getElementById("photos").style.display = "none";
        document.getElementById("comments").style.display = "none";
        document.getElementById("posts").style.display = "none";

        const pEl = document.createElement('p');
        pEl.appendChild(buttonEl);

        const liEl = document.createElement('li');
        liEl.appendChild(pEl);

        ulEl.appendChild(liEl);
    }
    
    return ulEl;
}

function onAlbumsReceived() {
    albumsDivEl.style.display = 'block';

    const text = this.responseText;
    const albums = JSON.parse(text);

    const divEl = document.getElementById('albums-content');
    while(divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createAlbumsList(albums));
}

function onLoadAlbums() {
    const el = this;
    const userId = el.getAttribute('user-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onAlbumsReceived);
    xhr.open('GET', BASE_URL + '/albums?userId=' + userId);
    xhr.send();
}

function createCommentsList(comments) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];

        const strongEl = document.createElement('strong');
        strongEl.textContent = comment.email;

        const pEl = document.createElement('p');
        pEl.appendChild(strongEl);
        pEl.appendChild(document.createTextNode(`: ${comment.body}`));

        const liEl = document.createElement('li');
        liEl.appendChild(pEl);

        ulEl.appendChild(liEl);
        document.getElementById('posts').style.display = 'none';
    }

    return ulEl;
}

function onCommentsReceived() {
    commentsDivEl.style.display = 'block';

    const text = this.responseText;
    const comments = JSON.parse(text);

    const divEl = document.getElementById('comments-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createCommentsList(comments));
}

function onLoadComments() {
    const el = this;
    const postId = el.getAttribute('data-post-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onCommentsReceived);
    xhr.open('GET', BASE_URL + '/comments?postId=' + postId);
    xhr.send();
}

function createUsersTableHeader() {
    const idTdEl = document.createElement('td');
    idTdEl.textContent = 'Id';

    const nameTdEl = document.createElement('td');
    nameTdEl.textContent = 'Name';

    const albumsTdEl = document.createElement('td');
    albumsTdEl.textContent = 'Album';

    const trEl = document.createElement('tr');
    trEl.appendChild(idTdEl);
    trEl.appendChild(nameTdEl);
    trEl.appendChild(albumsTdEl);

    const theadEl = document.createElement('thead');
    theadEl.appendChild(trEl);
    return theadEl;
}

function createUsersTableBody(users) {
    const tbodyEl = document.createElement('tbody');

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        // creating id cell
        const idTdEl = document.createElement('td');
        idTdEl.textContent = user.id;

        // creating name cell
        const dataUserIdAttr = document.createAttribute('data-user-id');
        dataUserIdAttr.value = user.id;

        const buttonEl = document.createElement('button');
        buttonEl.textContent = user.name;
        buttonEl.setAttributeNode(dataUserIdAttr);
        buttonEl.addEventListener('click', onLoadPosts);

        const nameTdEl = document.createElement('td');
        nameTdEl.appendChild(buttonEl);

        // creating albums cell
        const userIdAttr = document.createAttribute('user-id');
        userIdAttr.value = user.id;

        const albumButtonEl = document.createElement('button');
        albumButtonEl.textContent = 'Albums';
        albumButtonEl.setAttributeNode(userIdAttr);
        albumButtonEl.addEventListener('click', onLoadAlbums);

        const albumsTdEl = document.createElement('td');
        albumsTdEl.appendChild(albumButtonEl);

        // creating row
        const trEl = document.createElement('tr');
        trEl.appendChild(idTdEl);
        trEl.appendChild(nameTdEl);
        trEl.appendChild(albumsTdEl);

        tbodyEl.appendChild(trEl);
    }

    return tbodyEl;
}

function createUsersTable(users) {
    const tableEl = document.createElement('table');
    tableEl.appendChild(createUsersTableHeader());
    tableEl.appendChild(createUsersTableBody(users));
    return tableEl;
}

function onUsersReceived() {
    loadButtonEl.remove();

    const text = this.responseText;
    const users = JSON.parse(text);

    const divEl = document.getElementById('users-content');
    divEl.appendChild(createUsersTable(users));
}

function onLoadUsers() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onUsersReceived);
    xhr.open('GET', BASE_URL + '/users');
    xhr.send();
}

document.addEventListener('DOMContentLoaded', (event) => {
    usersDivEl = document.getElementById('users');
    postsDivEl = document.getElementById('posts');
    commentsDivEl = document.getElementById('comments');
    albumsDivEl = document.getElementById('albums');
    photosDivEl = document.getElementById('photos');
    loadButtonEl = document.getElementById('load-users');
    loadButtonEl.addEventListener('click', onLoadUsers);
});