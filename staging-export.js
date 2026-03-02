javascript: (async function() {
    const keys = ["txtIntroBlockDescription", "txtIntroBlockImage", "txtFeaturesMaterialsIntro", "txtFeaturesMaterialsText", "txtFeaturesImprintTitle", "txtFeaturesImprintText", "txtFeaturesImprintOptions", "txtFeaturesImprintImg", "txtFeaturesProductsTitle", "txtFeaturesProductsText", "txtFeaturesTipsTitle", "txtFeaturesTipsText", "txtFaqCategoryTitle", "txtFaqQuestionOne", "txtFaqAnswerOne", "txtFaqQuestionTwo", "txtFaqAnswerTwo", "txtFaqQuestionThree", "txtFaqAnswerThree", "txtFaqQuestionFour", "txtFaqAnswerFour", "txtFaqQuestionFive", "txtFaqAnswerFive", "txtProductTypesTitle", "txtProductTypesDescription", "txtBenefitsTipsTitle", "txtBenefitsTipsBullets", "txtReviewsBlockOne", "txtReviewsBlockTwo", "txtCTABlockTitle", "txtCTABlockDescription", "txtCTABlockButton", "txtCTABlockImage", "txtProductTypesBullets"];
    const data = {};
    keys.forEach(k => {
        const el = document.querySelector('[data-test-selector="' + k + '"]');
        if (el) {
            data[k] = {
                tag: el.tagName,
                type: el.type || null,
                value: el.type === "checkbox" ? el.checked : el.value
            };
        }
    });
    const text = JSON.stringify(data);
    try {
        await navigator.clipboard.writeText(text);
        alert("Znode fields copied to clipboard.");
    } catch (e) {
        prompt("Copy this manually:", text);
    }
})();