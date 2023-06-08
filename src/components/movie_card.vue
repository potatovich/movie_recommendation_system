<template>
    <div class="movie-card">
        <img class="movie-card-image" :src="require('../assets/posters/' + movieItem.image)" alt="img">
        <button @click="showDescription">Подробнее</button>
        <div class="popup-back" v-if="descriptionOnOff" >
            <DescriptionPopup class="popup" @closeDescription="closeDescription">
                <img class="description-popup-image" :src="require('../assets/posters/' + movieItem.image)" alt="img">
                <p>{{ movieItem.movie_name }}</p>
                <p>Жанр: {{ movieItem.genres[0] }}</p>
                <p>Описание: {{ movieItem.description }}</p>
                <p>Рейтинг: {{ movieItem.rating }}</p>
                <p>Год: {{ movieItem.year }}</p>
            </DescriptionPopup>
        </div>
    </div>
</template>

<script>
    import DescriptionPopup from "./description_popup.vue"

    export default({
        name: "MovieCard",
        components: {
            DescriptionPopup,
        },
        props: {
            movieItem: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                descriptionOnOff: false
            }
        },
        methods: {
            showDescription() {
                this.descriptionOnOff = true;
            },
            closeDescription() {
                this.descriptionOnOff = false;
            }
        }
    })
</script>

<style>
    .movie-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 330px;
        border-radius: 8px;
        box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.5);
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .popup-back {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
    }

    .popup {
        align-items: center;
    }

    .movie-card-image,
    .description-popup-image {
        width: 350px;
        height: 350px;
        object-fit: contain;
        border-radius: 5px;
        margin-bottom: 10px;
    }
</style>