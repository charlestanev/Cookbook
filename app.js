// // Prommise
// function getRecipeList(){
//     const url = 'http://localhost:3030/jsonstore/cookbook/recipes';

//     const main = document.querySelector('main');

//     fetch(url)
//     .then(response => response.json())
//     .then(recipes => {
//         main.innerHTML = '';
//         Object.values(recipes).forEach(r => {
//             const result = e('article', { className: 'preview' },
//                 e('div', { className: 'title' }, e('h2', {}, r.name)),
//                 e('div', { className: 'small' }, e('img', { src: r.img }))
//             );
//             main.appendChild(result);
//         });
//     })
//     .catch(error => {
//         alert(error.message);
//     });
// }

// Await/Fetch
async function getRecipeList() {
    const url = "http://localhost:3030/jsonstore/cookbook/recipes";

    const main = document.querySelector("main");

    try {
        const response = await fetch(url);

        if (response.ok == false) {
            throw new Error(response.statusText);
        }

        const recipes = await response.json();
        main.innerHTML = '';
        Object.values(recipes).map(createPreview).forEach(r => main.appendChild(r));

    } catch (error) {
        alert(error.message);
    }
}

function createPreview(recipe){
    const result = e('article',
        { className: 'preview' },
        e('div', { className: 'title' }, e('h2', {}, recipe.name)),
        e('div', { className: 'small' }, e('img', { src: recipe.img }))
    )

    result.addEventListener('click', () => getRecipeDetails(recipe._id));

    return result;
}

async function getRecipeDetails(id){
    const url = 'http://localhost:3030/jsonstore/cookbook/details/' + id;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
}

window.addEventListener("load", () => {
    getRecipeList();
});

function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (const [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == "on") {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach((e) => {
        if (typeof e == "string" || typeof e == "number") {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}
