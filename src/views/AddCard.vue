<template>
  <div class="add-card">
    <section>
      <div class="nav">
        <router-link to="/" class="btn">Вернуться в Dashboard</router-link>
      </div>
    </section>
    <section>
      <h3>Добавить карточку</h3>
      <CardForm @submit="submit"/>
    </section>
  </div>
</template>
<script>
import CardForm from "@/components/CardForm";

export default {
  components: { CardForm },
  methods: {
    submit(card) {
      this.$store.dispatch('addCard', card);
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>
