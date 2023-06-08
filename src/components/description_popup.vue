<template>
    <div class="description_popup">
        <slot></slot>
        <button @click="closeDescription">Закрыть</button>
    </div>
</template>

<script>
    export default({
        name: "DescriptionPopup",
        methods: {
            closeDescription() {
                this.$emit("closeDescription");
            }
        }
    })
</script>

<style>
    .description_popup {
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 50px;
        left: 25%;
        width: 50%;
        box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        background-color: white;
        padding: 20px;
    }
</style>