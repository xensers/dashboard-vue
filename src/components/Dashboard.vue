<template>
  <div class="dashboard">
    <div class="dashboard__controls">
      <router-link to="/add-card">Добавить</router-link>
      <span class="separator"></span>
      <label>
        <input type="checkbox" />
        <span>drag&drop</span>
      </label>
      <span class="separator"></span>
    </div>
    <transition-group name="list-complete" tag="div" class="dashboard__cards" ref="cards">
      <div
        v-for="(card, index) in cards"
        :key="card.id"
        class="dashboard__card list-complete-item"
        :class="{
          'dashboard__card--drag': card.isDrag,
          'dashboard__card--hover': card.isHover,
          'dashboard__card--moved': card.isHover && moved,
        }"
        ref="card"
        @mousedown="dragStart($event, index, card)"
        @mouseover="card.isHover = true"
        @mouseout="card.isHover = false"
      >
        <div class="dashboard__card-outer">
          <div class="dashboard__card-inner">
            <div class="card">
              <div class="card__title">{{ card.title }}</div>
              <div class="card__description">{{ card.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>

export default {
  name: "dashboard",
  data() {
    return {
      moved: false,
      cards: this.$store.getters.cards.map(card => ({
        ...card,
        isDrag: false,
        isHover: false
      }))
    }
  },
  watch: {
    cards(cards) {
      const cleanCards = cards.map(card => ({
          id: card.id,
          title: card.title,
          description: card.description,
      }));
      this.$store.dispatch('setCards', cleanCards)
    }
  },
  methods: {
    dragStart(event, index, card) {
      const cardElem = event.target.closest('.dashboard__card')
      const outerElem = cardElem.querySelector('.dashboard__card-inner')
      const innerElem = cardElem.querySelector('.dashboard__card-inner')
      const box = innerElem.getBoundingClientRect()
      const { offsetX, offsetY } = event

      this.moved = true
      card.isDrag = true

      innerElem.style.position = 'fixed'
      innerElem.style.zIndex = '10'
      innerElem.style.height = box.height + 'px'
      innerElem.style.width = box.width + 'px'
      outerElem.style.pointerEvents = 'none'
      outerElem.style.height = box.height + 'px'
      outerElem.style.width = box.width + 'px'

      const moveListener = (e) => {
        innerElem.style.top = e.clientY - offsetY + 'px'
        innerElem.style.left = e.clientX - offsetX + 'px'
      }

      const dragEnd = () => {
        const hoverCardIndex = this.cards.findIndex(({ isHover }) => isHover === true)
        if (hoverCardIndex > -1) {
          const cards = this.cards.slice()
          const movedCard = cards[hoverCardIndex];
          cards[hoverCardIndex] = cards[index];
          cards[index] = movedCard;
          this.cards = cards;
        }

        card.isDrag = false
        this.moved = false

        outerElem.removeAttribute('style')
        innerElem.removeAttribute('style')

        document.removeEventListener('mousemove', moveListener)
        document.removeEventListener('mouseup', dragEnd)
      }

      moveListener(event);
      document.addEventListener('mousemove', moveListener)
      document.addEventListener('mouseup', dragEnd)
    }
  }
}
</script>

<style lang="scss">
.dashboard {
  &__controls, &__body {
    margin: 1rem 0;
    padding-bottom: 1rem;
    border-bottom: 1px solid;
  }

  &__controls {
    padding: 0;
  }

  &__cards {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -0.5rem;
  }

  &__card {
    position: relative;
    margin: 0.5rem 0;
    padding: 1rem 0.5rem;
    flex-basis: 1 / 4 * 100%;
    cursor: pointer;
    user-select: none;

    &-outer {
      position: relative;
      height: 100%;
      background: #fff;

      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: red;
        opacity: 0;
      }
    }

    &--moved &-outer {
      background: #eee;
    }

    &--drag &-outer {
      border: 1px dashed;
    }

    &--drag &-inner {
      opacity: 0.8;
      background: #fff;
    }
  }
}

.card {
  position: relative;
  height: 100%;
  min-height: 10rem;
  padding: 1rem;
  border: 1px solid;

  &__title {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
}

.separator {
  display: inline-block;
  margin: 0 0.5rem;
  width: 1px;
  height: 100%;
  min-height: 3em;
  vertical-align: middle;
  background: black;
}
</style>
