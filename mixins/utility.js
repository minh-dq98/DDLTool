export default {
  computed: {
    errorStyle() {
      return (errors) => {
        const error = { backgroundColor: '#FFE9E9' }
        return errors.length ? error : {}
      }
    },
  },
  methods: {
    setPageTitle(data) {
      this.$store.commit('base/setPageTitle', data)
    },
    _toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    },
    _objToFormData(obj) {
      const formData = new FormData()
      for (const [key, value] of Object.entries(obj)) {
        formData.append(key, value)
      }
      return formData
    },
    onlyNumber($event) {
      const charCode = $event.which ? $event.which : $event.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        (charCode < 96 || charCode > 105)
      ) {
        $event.preventDefault()
      }
    },
    setInputFilter(inputs, inputFilter) {
      const events = [
        'input',
        'keydown',
        'keyup',
        'mousedown',
        'mouseup',
        'select',
        'contextmenu',
        'drop',
      ]
      events.forEach(function (event) {
        inputs.forEach(function (input) {
          input.addEventListener(event, function () {
            if (inputFilter(this.value)) {
              this.oldValue = this.value
              this.oldSelectionStart = this.selectionStart
              this.oldSelectionEnd = this.selectionEnd
            } else if (this.oldValue !== null) {
              this.value = this.oldValue
              this.setSelectionRange(
                this.oldSelectionStart,
                this.oldSelectionEnd
              )
            } else {
              this.value = ''
            }
          })
        })
      })
    },
  },
}
