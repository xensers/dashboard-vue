<template>
  <div class="edit-card">
    <section>
      <div class="nav">
        <router-link to="/" class="btn">Вернуться в Dashboard</router-link>
      </div>
    </section>
    <section>
      <h3>Редактировать карточку {{ $route.params.id }}</h3>
      <CardForm
          :card="$store.getters.cardById($route.params.id)"
          @submit="submit"
      />
    </section>
  </div>
</template>
<script>
import CardForm from "@/components/CardForm";

export default {
  components: { CardForm },
  methods: {
    submit(card) {
      this.$store.dispatch('updateCard', card);
      this.$router.push({
        name: 'Home'
      })
    }
  }
}
</script>
