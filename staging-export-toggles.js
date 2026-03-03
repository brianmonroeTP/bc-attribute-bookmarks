javascript: (async function() {
    const keys = [
        "txtIntroBlockTitle", 
        "txtIntroBlockDescription", 
        "txtIntroBlockImage", 
        "txtFeaturesIntroTitle",
        "txtFeaturesIntroText",
        "txtFeaturesTypesTitle",
        "txtFeaturesTypesText",
        "txtFeaturesWeightTitle",
        "txtFeaturesWeightText",
        "txtFeaturesWeightText2",
        "txtFeaturesMaterialsIntro", 
        "txtFeaturesMaterialsText", 
        "txtFeaturesImprintTitle", 
        "txtFeaturesImprintText", 
        "txtFeaturesImprintOptions", 
        "txtFeaturesImprintImg", 
        "txtFeaturesProductsTitle", 
        "txtFeaturesProductsText", 
        "txtFeaturesTipsTitle", 
        "txtFeaturesTipsText", 
        "txtFaqCategoryTitle", 
        "txtFaqImage",
        "txtFaqQuestionOne", 
        "txtFaqAnswerOne", 
        "txtFaqQuestionTwo", 
        "txtFaqAnswerTwo", 
        "txtFaqQuestionThree", 
        "txtFaqAnswerThree", 
        "txtFaqQuestionFour", 
        "txtFaqAnswerFour", 
        "txtFaqQuestionFive", 
        "txtFaqAnswerFive", 
        "txtVideoBlockTitle",
        "txtVideoBlockDescription",
        "txtVideoBlockWistiaID",
        "txtProductTypesTitle", 
        "txtProductTypesDescription", 
        "txtProductTypesBullets",
        "txtBenefitsTipsTitle", 
        "txtBenefitsTipsBullets", 
        "txtReviewsBlockOne", 
        "txtReviewsBlockTwo", 
        "txtCTABlockTitle", 
        "txtCTABlockDescription", 
        "txtCTABlockButton", 
        "txtCTABlockImage", 
        "txtProductTypesBullets"
    ];

    const toggleMap = {
        toggleIntroBlock:             ["chkYesIntroBlock",             "chkNoIntroBlock"],
        toggleFeaturesIntroBlock:     ["chkYesFeaturesIntroBlock",     "chkNoFeaturesIntroBlock"],
        toggleFeaturesTypesBlock:     ["chkYesFeaturesTypesBlock",     "chkNoFeaturesTypesBlock"],
        toggleFeaturesWeightBlock:    ["chkYesFeaturesWeightBlock",    "chkNoFeaturesWeightBlock"],
        toggleFeaturesMaterialsBlock: ["chkYesFeaturesMaterialsBlock", "chkNoFeaturesMaterialsBlock"],
        toggleFeaturesImprintBlock:   ["chkYesFeaturesImprintBlock",   "chkNoFeaturesImprintBlock"],
        toggleFeaturesProductsBlock:  ["chkYesFeaturesProductsBlock",  "chkNoFeaturesProductsBlock"],
        toggleFeaturesTipsBlock:      ["chkYesFeaturesTipsBlock",      "chkNoFeaturesTipsBlock"],
        toggleFaqSchemaBlock:         ["chkYesFaqSchemaBlock",         "chkNoFaqSchemaBlock"],
        toggleShowVideoBlock:         ["chkYesShowVideoBlock",         "chkNoShowVideoBlock"],
        toggleProductTypes:           ["chkYesProductTypes",           "chkNoProductTypes"],
        toggleBenefitsTips:           ["chkYesBenefitsTips",           "chkNoBenefitsTips"],
        toggleReviewsBlock:           ["chkYesReviewsBlock",           "chkNoReviewsBlock"],
        toggleCTABlock:               ["chkYesCTABlock",               "chkNoCTABlock"],
    };

    const data = {};

    // Standard text/textarea fields
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

    // Yes/No radio toggles
    Object.entries(toggleMap).forEach(([logicalKey, [yesSelector, noSelector]]) => {
        const yesEl = document.querySelector('[data-test-selector="' + yesSelector + '"]');
        const noEl  = document.querySelector('[data-test-selector="' + noSelector + '"]');
        if (yesEl || noEl) {
            data[logicalKey] = {
                tag: "INPUT",
                type: "radio",
                value: yesEl && yesEl.checked ? "true" : "false"
            };
        }
    });

    const text = JSON.stringify(data);
    try {
        await navigator.clipboard.writeText(text);
        alert("Znode fields copied to clipboard (" + Object.keys(data).length + " fields, including toggles).");
    } catch (e) {
        prompt("Copy this manually:", text);
    }
})();