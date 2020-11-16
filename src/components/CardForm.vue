<template>
  <form class="card-form" @submit.prevent="submit">
    <div class="card-form__fields">
      <div class="card-form__field">
        <label>Название</label>
        <input type="text" v-model="title">
      </div>
      <div class="card-form__field">
        <label>Описание</label>
        <textarea v-model="description"></textarea>
      </div>
    </div>
    <div class="card-form__submit">
      <button class="btn btn--blue" type="submit">Сохранить</button>
      <button class="btn" type="reset">Сбросить</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "CardForm",
  data() {
    return {
      id: this.$store.getters.cards.length,
      title: '',
      description: ''
    }
  },
  methods: {
    submit() {
      const { id, title, description } = this;
      console.log(id, title, description)
      if (!!title && !!description) {
        this.$emit('submit', { id, title, description })
      }
    }
  }
}
</script>

<style lang="scss">
.card-form {
  margin: 2rem 0;
  max-width: 30rem;

  &__title {}
  &__fields {
    margin: 2rem 0;
  }
  &__field {
    margin-bottom: 1rem;
  }
}
</style>
