(() => {
    var cmdNoDate = document.getElementById('cmd-no-date')
    if (cmdNoDate) {
        var dateEl = document.getElementById('date')
        dateEl.parentNode.removeChild(dateEl)
        cmdNoDate.parentNode.removeChild(cmdNoDate)
    }

})()