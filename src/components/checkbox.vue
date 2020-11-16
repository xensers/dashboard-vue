<template>
  <label
    class="checkbox"
    :class="{
      'checkbox--is-checked': value,
    }"
    @click="$emit('input', !value)"
  >
    <input v-bind="$attrs" type="hidden" :value="value" />
    <div class="checkbox__icon">
      <svg
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="border"
          d="M5 0.5H14C16.4849 0.5 18.5 2.51514 18.5 5V14C18.5 16.4849 16.4849 18.5 14 18.5H5C2.51514 18.5 0.5 16.4849 0.5 14V5C0.5 2.51514 2.51514 0.5 5 0.5Z"
        />
        <path id="arrow" d="M5 9.5L8 13L16 5" />
      </svg>
    </div>
    <div class="checkbox__slot">
      <slot />
    </div>
  </label>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
};
</script>

<style lang="scss" scoped>
$color-white: #fff;
$color-lighten: #eee;
$color-blue: #0093d7;

@keyframes checkbox-border-hover {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: 32;
  }
}

.checkbox {
  $self: &;

  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  &__icon {
    position: relative;
    overflow: hidden;
    margin-right: 0.5em;
    border-radius: 5px;
    width: 19px;
    height: 19px;
    background: $color-lighten;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: $color-blue;
      opacity: 0;
      transform: scale(0);
      transition: all 0.3s ease 0.3s;
    }

    svg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    path#border {
      stroke: transparent;
      stroke-dasharray: 16;
      stroke-dashoffset: 0;
      transition: all 0.5s ease;
      animation: checkbox-border-hover 0.3s linear infinite;
    }

    path#arrow {
      stroke: $color-white;
      stroke-dasharray: 16;
      stroke-dashoffset: 16;
      transition: all 0.3s ease;
    }

    @media (hover) {
      #{$self}:hover & {
        path#border {
          stroke: $color-blue;
          stroke-dashoffset: 0;
        }
      }
    }

    #{$self}--is-checked & {
      &::before {
        opacity: 1;
        transform: scale(1);
        transition-delay: 0s;
      }

      path#arrow {
        stroke-dashoffset: 0;
        transition-delay: 0.3s;
      }
    }
  }
}
</style>
