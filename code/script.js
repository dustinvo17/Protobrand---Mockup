window.onload = init

function init() {
    let countCheckedBoxes = 0 // TO CHECK IF THE USER CLICK THE BOX, IF > 1
    let buttonNext = $('.survey-button')
    let brandNameList = $('.brand-name')
    let brandLogoList = $('.survey-brand--item__img')
    let inputCheckBoxes = $('input[type="checkbox"]')
    let currentBrandIndex = 0

    $('button').on('click', function () {
        // IF USER HAVE ALREADY DONE  ADIDAS BRAND, RETURN OR SUBMIT FORM
        if (currentBrandIndex === 3) {
            return
        }
        // function to return dynamic image url base on active status
        function returnImgSrc(active) {
            let imgSrc = $(brandLogoList[currentBrandIndex]).children().attr('src')
            if (active) {
                return (imgSrc.replace('g-', ''))

            } else {
                return ('./logo/g-' + imgSrc.slice(7))
            }

        }
        // function return either logo brand element or name brand element in order to add dynamic styling . Make code clean and consistent.
        function brandComponent(logo) {
            // logo === true will return the logo brand element , else will return name brand element
            if (logo) {
                return $(brandLogoList[currentBrandIndex])
            } else {
                return $(brandNameList[currentBrandIndex])
            }
        }

        // RESET CHECKBOXES WHEN NEVER USER CLICK NEXT TO NEW BRANDING SURVEY
        inputCheckBoxes.prop('checked', false);
        countCheckedBoxes = 0
        // DYNAMIC STYLING OF THE LOGO AND NAME OF BRAND 
        brandComponent(true).removeClass('current-active')
        brandComponent(true).children().attr('src', returnImgSrc(false))
        brandComponent(false).removeClass('brand-name--checked')



        currentBrandIndex++
        brandComponent(true).children().attr('src', returnImgSrc(true))
        brandComponent(true).addClass('current-active')
        brandComponent(false).attr("style", "--afterElemWidth:100%")
        brandComponent(false).addClass('brand-name--checked')
        // RESET NEXT BUTTON STYLING AND THE BACKGROUND COLOR OF THE PREVIOUS CHECKED BOXES
        resetCheckBoxContainer(inputCheckBoxes)
        dynamicNextBtn(countCheckedBoxes)
    })
    inputCheckBoxes.change(function () {
        if ($(this).is(':checked')) {
            countCheckedBoxes++

            $('.survey-dot').css('display', 'none')
            buttonNext.css('display', 'flex')
            dynamicInputContainer(this, true)

            dynamicNextBtn(countCheckedBoxes)
        } else {
            countCheckedBoxes--
            dynamicInputContainer(this, false)
            dynamicNextBtn(countCheckedBoxes)

        }


    })




}
// DYNAMIC NEXT BUTTON STYLING TO CHECK IF USER CHECKED 1 OF THE CHECKBOXES
function dynamicNextBtn(count) {
    let cssChange = {
        "background": `${count >0 ? '#2C57DA' :'#DFDFDF'}`,
        "color": `${count >0 ? 'white':'#888888'}`,
        "pointer-events": `${count >0 ? 'auto':'none'}`
    }

    $('button').css(cssChange)
}
// DYNAMIC STYLING CHECKBOX CONTAINER TO CHANGE COLOR BACKGROUND TO BLUE WHEN USER CLICK
function dynamicInputContainer(input, checked) {
    let cssChange = {
        "background": `${checked ? '#2C57DA' :'white'}`,
        "color": `${checked? 'white':'black'}`,

    }
    $(input).parent().css(cssChange)
}
// RESET CHECKBOX CONTAINER COLOR AFTER USER CLICK NEXT TO SURVEY NEW BRAND
function resetCheckBoxContainer(checkboxes) {
    for (let i = 0; i < checkboxes.length; i++) {

        dynamicInputContainer(checkboxes[i], false)
    }

}