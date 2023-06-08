<template>
    <div class="from-with-questions">
        <div class="age-restriction-block">
            <legend>Вы достигли совершеннолетия?</legend>
            <div>
                <label for="adult">Да</label>
                <input type="radio" id="adult" name="full-age" value="18+" @click="getAgeRestrictionBlockValue">
            </div>
            <div>
                <label for="young">Нет</label>
                <input type="radio" id="young" name="full-age" @click="notAdultBlockOnOff">
            </div>
        </div>

        <div class="age-block" v-if="notAdultBlock">
            <legend>Выберите ваш возраст:</legend>
            <div>
                <label for="baby">12+</label>
                <input type="radio" id="baby" name="age" value="12+" @click="getAgeBlockValueBaby">
            </div>
            <div>
                <label for="teenager">16+</label>
                <input type="radio" id="teenager" name="age" value="16+" @click="getAgeBlockValueTeen">
            </div>
        </div>

        <div v-if="otherInfoBlock">
            <div class="emotions-block">
                <legend>Какие эмоции хотите от фильма?</legend>
                <div>
                    <label for="happiness">Радость</label>
                    <input type="radio" id="happiness" name="emotions" value="комедия" @click="getValueFromEmotionsBlock">
                </div>
                <div v-if="babyFlag">
                    <label for="fear">Страх</label>
                    <input type="radio" id="fear" name="emotions" value="ужасы" @click="getValueFromEmotionsBlock">
                </div>
                <div v-if="babyFlag">
                    <label for="tension">Напряжение</label>
                    <input type="radio" id="tension" name="emotions" value="триллер" @click="getValueFromEmotionsBlock">
                </div>
                <div v-if="babyFlag">
                    <label for="detective">Увлечённость и недоумение</label>
                    <input type="radio" id="detective" name="emotions" value="детектив" @click="getValueFromEmotionsBlock">
                </div>
                <div>
                    <label for="science-fiction">Новые ощущения</label>
                    <input type="radio" id="science-fiction" name="emotions" value="фантастика" @click="getValueFromEmotionsBlock">
                </div>
                <div>
                    <label for="reflection">Рефлексия</label>
                    <input type="radio" id="reflection" name="emotions" value="драма" @click="getValueFromEmotionsBlock">
                </div>
            </div>
            <div class="ratings-block">
                <legend>Выберите рейтинг фильма:</legend>
                <div>
                    <label for="medium">от 5 до 7</label>
                    <input type="radio" id="medium" name="ratings" :value="5" @click="getValueFromRatingsBlock">
                </div>
                <div>
                    <label for="high">от 8 и выше</label>
                    <input type="radio" id="high" name="ratings" :value="8" @click="getValueFromRatingsBlock">
                </div>
            </div>            
            <button @click="checker" style="width: 340px; margin-top: 10px">OK</button>
        </div>
    </div>
</template>

<script>
    export default ({
        name: "FormWithQuestions",
        components: {},
        data() {
            return {
                filmsData: {
                    genre: '',
                    age_restriction: '',
                    rating: []
                },
                notAdultBlock: false,
                babyFlag: true,
                otherInfoBlock: false,
            }
        },
        methods: {
            getAgeRestrictionBlockValue(event) {
                this.filmsData.age_restriction = event.target.value;
                this.notAdultBlock = false;
                this.babyFlag = true;
                this.otherInfoBlock = true;
            },
            notAdultBlockOnOff(event) {
                this.notAdultBlock = true;
            },
            getAgeBlockValueBaby(event) {
                this.filmsData.age_restriction = event.target.value;
                this.babyFlag = false;
                this.otherInfoBlock = true;
            },
            getAgeBlockValueTeen(event) {
                this.filmsData.age_restriction = event.target.value;
                this.babyFlag = true;
                this.otherInfoBlock = true;
            },
            getValueFromEmotionsBlock(event) {
                this.filmsData.genre = event.target.value;
            },
            getValueFromRatingsBlock(event) {
                const firstRateNum = parseInt(event.target.value);
                if (firstRateNum == 5) {
                    this.filmsData.rating = [firstRateNum, 7.9];
                } else {
                    this.filmsData.rating = [firstRateNum, 10];
                }
            },
            checker() {
                if (this.filmsData.genre === '' || this.filmsData.age_restriction === '' || this.filmsData.rating.length === 0) {
                    alert('Заполните все поля формы!');
                } else {
                    // console.log(this.filmsData);
                    this.$emit("getFilmsData", this.filmsData);
                }
            },
        }
    })
</script>

<style>
    .from-with-questions {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .age-restriction-block,
    .emotions-block,
    .ratings-block,
    .age-block {
        width: 300px;
        border: 1px solid black;
        border-radius: 5px;
        padding: 20px;
        margin-top: 10px;
    }
</style>