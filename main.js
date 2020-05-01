const courses = document.getElementById('courses')
const main = document.getElementById('main')
const checkQuery = window.matchMedia('(max-width: 600px)').matches

const getCourses = async () => {
    const res = await fetch('https://secure-ocean-05070.herokuapp.com/courses/')
    const data = await res.json()

    const course = data.forEach(el => {
        //Get all data from the API
        const ID = el.id
        let image;
        checkQuery ? image = el.poster.formats.small.url : image = el.poster.formats.medium.url
        const title = el.name.split(' ').slice(2).join(' ')
        const composer = el.name.split(' ').slice(0, 2).join(' ')
        const numLessons = el.lessons.length
        const desc = el.description.split(' ').slice(0, 20).join(' ')
        const price = el.price.toLocaleString('en-US', {
            style: "currency",
            currency: "USD"
        })

        //Create DOM element for the course card
        const card = document.createElement('div')
        card.setAttribute('class', 'course-card')
        card.innerHTML = `
            <img src="${image}" class="course-card__image" alt="course-image">
            <div class="course-card__content">
                <h3 class="course-card__title" id="${ID}">${composer}<small>${title}</small></h3>
                <p class="course-card__num-lessons">(${numLessons} lessons)</p>
                <p class="course-card__description">${desc}...</p>
                <a href="${ID}" class="course-card__link">see course ==></a>
                <h4 class="course-card__price">${price}</h4>
            </div>
        `
        courses.appendChild(card)
    });



}

getCourses()