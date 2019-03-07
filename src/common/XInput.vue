 <template>
  <div :class="wrapClass">
    <input
      :type="type"
      :placeholder="placeholder"
      :class="inputClass"
      :autofocus="autofocus"
      :maxlength="maxlength"
      v-model="value"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="inputFunc"
      ref="item_input"
    >
  </div>
</template>

<script>
export default {
  name: "XInput",
  props: {
    placeholder: {
      type: String,
      required: false
    },
    autofocus: {
      type: Boolean,
      required: false
    },
    inputValue: {
      type: [String, Number],
      required: ""
    },
    size: {
      type: String,
      required: false,
      default: "md"
    },
    error: {
      type: Boolean,
      required: false,
      default: false
    },
    type: {
      type: String,
      required: false,
      default: "text"
    },
    focus: {
      type: Boolean,
      required: false
    },
    maxlength: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      value: this.$props.inputValue
    };
  },
  computed: {
    inputClass() {
      return [
        "x-input",
        "x-input_backup",
        `x-input_${this.size}`,
        `x-input_${this.size}_backup`,
        {
          "x-input_error": this.error && this.value
        }
      ];
    },
    wrapClass() {
      return [
        "x-input--wrapper",
        "x-input--wrapper_backup",
        `x-input--wrapper_${this.size}`,
        `x-input--wrapper_${this.size}_backup`,
        {
          "x-input--wrapper_error": this.error && this.value
        }
      ];
    }
  },
  watch: {
    inputValue() {
      this.value = this.inputValue;
    },
    focus() {
      if (this.focus) {
        this.$refs.item_input.focus();
      }
    }
  },
  methods: {
    inputFunc(e) {
      this.$emit('input', e)
      this.$emit("changeInputValue", this.value);
    },
    handleBlur(e) {
      this.$emit('blur', e)
    },
    handleFocus(e) {
      this.$emit('focus', e)
    }
  }
};
</script>

<style lang="less" scoped>
.x-input {
  position: relative;
  display: block;
  // width: 100%;
  border: 1px solid #dcdfe6;
  border-radius: 100px;
  transition: all 0.3s;
  color: #333;
  box-sizing: border-box;
  box-shadow: 0 10px 10px 0 rgba(18, 18, 23, 0.2);
  &_backup {
    width: 268px;
    font-size: 12px;
    height: 24px;
    padding: 0 1em;
    max-width: 100%;
    padding-right: 22px;
  }
  &_error {
    border-color: #fa5555 !important;
  }
  &_lg {
    &_backup {
      width: 240px;
      font-size: 14px;
      height: 40px;
      padding: 0 1em;
      box-shadow: none;
    }
  }
  &::-moz-placeholder {
    color: #333;
    opacity: 0.4;
    opacity: 1;
  }
  &:-ms-input-placeholder {
    color: #333;
    opacity: 0.4;
  }
  &::-webkit-input-placeholder {
    color: #333;
    opacity: 0.4;
  }
  &:hover {
    border: 1px solid #91959d;
  }
  &:focus {
    outline: none;
    border: 1px solid #427bf7;
    background: linear-gradient(to right, #492da5, #427bf7) 30 30;
    background-clip: padding-box;
  }

  &--wrapper {
    position: relative;
    &_backup {
      width: 268px;
      height: 24px;
      max-width: 100%;
    }
    &_lg_backup {
      width: 240px;
      height: 40px;
      margin-bottom: 10px;
    }
    &_error {
      .x-input--clear {
        display: block;
        position: absolute;
        top: 50%;
        right: 1em;
        transform: translate(0, -50%);
        cursor: pointer;
        &_backup {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
  &--clear {
    display: none;
  }
}
</style>
