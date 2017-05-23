<template>
<label class="el-switch" :class="{ 'is-disabled': disabled, 'el-switch--wide': hasText }">
	<div class="el-switch__mask" v-show="disabled"></div>
	<input
					class="el-switch__input"
					type="checkbox"
					@change="handleChange"
					v-model="_value"
					:name="name"
					:disabled="disabled">
	<span class="el-switch__core" ref="core" :style="{ 'width': coreWidth + 'px' }">
		<span class="el-switch__button" :style="buttonStyle"></span>
	</span>
	<transition name="label-fade">
		<div
						class="el-switch__label el-switch__label--left"
						v-show="value"
						:style="{ 'width': coreWidth + 'px' }">
			<i :class="[onIconClass]" v-if="onIconClass"></i>
			<span v-if="!onIconClass && onText">{{ onText }}</span>
		</div>
	</transition>
	<transition name="label-fade">
		<div class="el-switch__label el-switch__label--right"
				v-show="!value"
				:style="{ 'width': coreWidth + 'px' }">
			<i :class="[offIconClass]" v-if="offIconClass"></i>
			<span v-if="!offIconClass && offText">{{ offText }}</span>
		</div>
	</transition>
</label>
</template>

<script>
  export default {
    name: 'ElSwitch',
    props: {
      value: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 0
      },
      onIconClass: {
        type: String,
        default: ''
      },
      offIconClass: {
        type: String,
        default: ''
      },
      onText: {
        type: String,
        default: 'ON'
      },
      offText: {
        type: String,
        default: 'OFF'
      },
      onColor: {
        type: String,
        default: ''
      },
      offColor: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        coreWidth: this.width,
        buttonStyle: {
          transform: ''
        }
      };
    },
    computed: {
      hasText() {
        /* istanbul ignore next */
        return this.onText || this.offText;
      },
      _value: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit('input', val);
        }
      }
    },
    watch: {
      value() {
        if (this.onColor || this.offColor) {
          this.setBackgroundColor();
        }
        this.handleButtonTransform();
      }
    },
    methods: {
      handleChange(event) {
        this.$emit('change', event.currentTarget.checked);
      },
      handleButtonTransform() {
        this.buttonStyle.transform = this.value ? `translate(${ this.coreWidth - 20 }px, 2px)` : 'translate(2px, 2px)';
      },
      setBackgroundColor() {
        let newColor = this.value ? this.onColor : this.offColor;
        this.$refs.core.style.borderColor = newColor;
        this.$refs.core.style.backgroundColor = newColor;
      }
    },
    mounted() {
      /* istanbul ignore if */
      if (this.width === 0) {
        this.coreWidth = this.hasText ? 58 : 46;
      }
      this.handleButtonTransform();
      if (this.onColor || this.offColor) {
        this.setBackgroundColor();
      }
    }
  };
</script>
<style>

.el-switch {
    display: inline-block;
    position: relative;
    font-size: 14px;
    line-height: 22px;
    height: 22px
}

.el-switch__label,.el-switch__label * {
    position: absolute;
    display: inline-block;
    font-size: 14px
}

.el-switch.is-disabled .el-switch__core {
    border-color: #e4e8f1!important;
    background: #e4e8f1!important
}

.el-switch.is-disabled .el-switch__core span {
    background-color: #fbfdff!important
}

.el-switch.is-disabled .el-switch__core~.el-switch__label * {
    color: #fbfdff!important
}

.el-switch.is-disabled .el-switch__input:checked+.el-switch__core {
    border-color: #e4e8f1;
    background-color: #e4e8f1
}

.el-switch.is-disabled .el-switch__core,.el-switch.is-disabled .el-switch__label {
    cursor: not-allowed
}

.el-switch__label {
    transition: .2s;
    z-index: 10;
    left: 0;
    top: 0;
    user-select: none
}

.el-checkbox,.el-pager {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none
}

.el-switch__label * {
    line-height: 1;
    top: 4px;
    color: #fff
}

.el-switch__label--left i {
    left: 6px
}

.el-switch__label--right i {
    right: 6px
}

.el-switch__input {
    display: none
}

.el-switch__input:checked+.el-switch__core {
    border-color: #20a0ff;
    background-color: #20a0ff
}

.el-switch__core {
		height: 22px;
    margin: 0;
    display: inline-block;
    position: relative;
    border: 1px solid #bfcbd9;
    outline: 0;
    border-radius: 12px;
    background: #bfcbd9;
    transition: border-color .3s,background-color .3s
}

.el-switch__core .el-switch__button {
    top: 0;
    left: 0;
    position: absolute;
    border-radius: 100%;
    transition: transform .3s;
    width: 16px;
    height: 16px;
    z-index: 20;
    background-color: #fff
}

.el-switch--wide .el-switch__label.el-switch__label--left span {
    left: 10px
}

.el-switch--wide .el-switch__label.el-switch__label--right span {
    right: 10px
}

</style>
