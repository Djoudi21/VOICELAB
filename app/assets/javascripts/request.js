// let tata = {"type":"alias.contract","client":{"type":"anychain.signature","date":"Mon, 23 Sep 2019 21:20:23 GMT","signer":{"_bytes":"5HfQie9XLS_WSg3qHAO0nID2NELhxsW6Y0FVsPEPA6k"},"body":{"type":"alias.client.decl","crypto":{"sign":{"bytes":"5HfQie9XLS_WSg3qHAO0nID2NELhxsW6Y0FVsPEPA6k"},"box":{"bytes":"rYCKMvxV5fBt82dL17-cnOIppFv29ArnAXiJEhKQbBg"}},"name":"Voice Labs","desc":"Teach machines how human talks","domain":"demo.gdpr.dev","company":"Voice Labs Inc"},"signature":{"_bytes":"jl-pIUk5o0eQSSY7l4eeokTCx_w3wXPDvItkJKZ3bm5RMc41GBu_Tm8Ywx_SLbcTAHXNmWC8GiGOcp2hr96vBA"}},"legal":{"accept_users_right_access_modify_transfer_delete":true,"automated_decision":false,"automated_surveillance":false,"destination":["Snips Inc","Voxist","Voicelow","Roger Voice"],"email_dpo":"dpo@voicelabs.co","evaluation_notation_rating_profiling":false,"innovative_reasonable_expectations":false,"mixing_reasonable_expectations":false,"storage_duration":"2 years after your Voice Labs account is closed","subprocessors":[],"tos_url":"https://voicelabs.co/tos/","transfer_outside_eea":false,"usage":"(global) Manipulate your Audio recordings lol"},"base":{"consent":[{"scopes":[{"provider":"google","path":"my_activity.assistant"},{"provider":"amazon","path":"alexa"}],"usages":["Train our Speech-to-Text algorithm"]}],"contractual": {"scopes": [{"provider": "google", "path": "my_account.email"}], "usages": ["To keep communication"]}, "legitimate": {"groups": [{"scopes": [{"provider": "google", "path": "my_account.connection_history"}], "usages": ["Detect fraudulent activity"]}], "reason": "For satefy reasons"}}, "network":{"redirectEndpoint": "/cb/"}};

Vue.component('verb', {
    props: ['value'],
    data: () => { return {}; },
    template: `
<span v-if="value"><b style="text-transform: uppercase;"><slot></slot></b></span><span v-else-if="!value"><b style="text-transform: uppercase;"><slot></slot> NOT</b></span>
`,
});

var vue = null;

function deepcloneJSON(x) {
    return JSON.parse(JSON.stringify(x));
}

function getContractCallbackURL(contract) {
    const network = contract.network || {};
    const scheme = network.scheme || "https";
    const domain = contract.client.body.domain;
    const endpoint = network.redirectEndpoint || "/alias/cb/";
    if (endpoint.charAt(0) != "/") { throw "bad endpoint"; }
    const url = `${scheme}://${domain}${endpoint}`;
    return url;
}

function cbReturnError(contract, error, desc, uri) {
    const state = (new URL(window.location.href)).searchParams.get('state');

    let url = getContractCallbackURL(contract) + "?";
    url = url + "error=" + encodeURIComponent(error);
    if (desc)  url = url + "&error_description=" + encodeURIComponent(desc);
    if (uri)   url = url + "&error_uri=" + encodeURIComponent(uri);
    if (state) url = url + "&state=" + encodeURIComponent(state);

    window.location.href = url;
}

function cbReturn(contract, grant, bind) {
    const state = (new URL(window.location.href)).searchParams.get('state');

    let url = getContractCallbackURL(contract) + "?";
    url = url + "code=" + encodeURIComponent(chain.toToken(grant));
    url = url + "&bind=" + encodeURIComponent(chain.toToken(bind));
    if (state) url = url + "&state=" + encodeURIComponent(state);

    //console.log("redirect to", url);
    window.location.href = url;
}

async function run() {
    await authed();

    let contractVoicelab = {"type":"alias.contract","client":{"type":"anychain.signature","date":"Mon, 23 Sep 2019 21:20:23 GMT","signer":{"__bytes":"5HfQie9XLS_WSg3qHAO0nID2NELhxsW6Y0FVsPEPA6k"},"body":{"type":"alias.client.decl","crypto":{"sign":{"__bytes":"5HfQie9XLS_WSg3qHAO0nID2NELhxsW6Y0FVsPEPA6k"},"box":{"__bytes":"rYCKMvxV5fBt82dL17-cnOIppFv29ArnAXiJEhKQbBg"}},"name":"Voice Labs","desc":"Teach machines how human talks","domain":"demo.gdpr.dev","company":"Voice Labs Inc"},"signature":{"__bytes":"jl-pIUk5o0eQSSY7l4eeokTCx_w3wXPDvItkJKZ3bm5RMc41GBu_Tm8Ywx_SLbcTAHXNmWC8GiGOcp2hr96vBA"}},"legal":{"accept_users_right_access_modify_transfer_delete":true,"automated_decision":false,"automated_surveillance":false,"destination":["Snips Inc","Voxist","Voicelow","Roger Voice"],"email_dpo":"dpo@voicelabs.co","evaluation_notation_rating_profiling":false,"innovative_reasonable_expectations":false,"mixing_reasonable_expectations":false,"storage_duration":"2 years after your Voice Labs account is closed","subprocessors":[],"tos_url":"https://voicelabs.co/tos/","transfer_outside_eea":false,"usage":"(global) Manipulate your Audio recordings lol"},"base":{"consent":[{"scopes":[{"provider":"google","path":"my_activity.assistant"},{"provider":"amazon","path":"alexa"}],"usages":["Train our Speech-to-Text algorithm"]}],"contractual": {"scopes": [{"provider": "google", "path": "my_account.email"}], "usages": ["To keep communication"]}, "legitimate": {"groups": [{"scopes": [{"provider": "google", "path": "my_account.connection_history"}], "usages": ["Detect fraudulent activity"]}], "reason": "For satefy reasons"}}, "network":{"redirectEndpoint": "/cb/"}}

    const {userSeed, box} = currentSession();
    const idty = openBox(box, userSeed);

    const selfPublicKey = idty.sign.publicKey;
    if (!selfPublicKey) { throw "no sign publicKey set"; }

    const url = new URL(window.location.href);

    // check contract
          var contract = chain.fromJSON(contractVoicelab);

        if (contract.type != 'alias.contract') {
            throw "not a contract";
        }

    const hasContractual = contract.base.contractual && contract.base.contractual.scopes.length != 0 && contract.base.contractual.usages.length != 0;
    const hasConsent = contract.base.consent && contract.base.consent.length != 0;
    const hasLegitimate = contract.base.legitimate && contract.base.legitimate.groups.length != 0;

    const draftContract = deepcloneJSON(contract);
    for (const consent of draftContract.base.consent) {
        for (const scope of consent.scopes) {
            scope.agree = false;
        }
    }

    vue = new Vue({
        el: "#popup",
        data: {
            c: draftContract,
            hasConsent: hasConsent,
            hasContractual: hasContractual,
            hasLegitimate: hasLegitimate,
            showAdvanced: false,
        },
        methods: {
            toggleAdvanced: function() {
                this.showAdvanced = !this.showAdvanced;
            },
            agree: function() {
                const consentedScopes = [];
                for (const consent of this.c.base.consent) {
                    const scopes = [];
                    for (const scope of consent.scopes) {
                        const agreed = scope.agree;
                        scopes.push(agreed);
                    }
                    consentedScopes.push(scopes);
                }

                const legitimateScopes = [];
                for (const legitimate of this.c.base.legitimate.groups) {
                    const scopes = [];
                    for (const scope of legitimate.scopes) {
                        // by default, all legitimate are agreed
                        scopes.push(true);
                    }
                    legitimateScopes.push(scopes);
                }

                let grant = {
                    type: "alias.grant",
                    contract: contract,//chain.fold(contract),
                    revoked: false,
                    base: {
                        contractual: true,
                        consent: consentedScopes,
                        legitimate: legitimateScopes,
                    },
                };

                grant = chain.sign(idty.sign, grant);
                console.log("grant:", grant);

                $.ajax({
                    method: 'POST',
                    url: "/api/contract/grant",
                    data: chain.toToken(grant),
                    contentType: "application/json",
                }).then((r) => {
                    cbReturn(contract, grant, idty.bind);
                });
            },
            deny: function() {
                cbReturnError(contract, "access_denied");
            },
        }
    });

    $("#popup").show();
};
