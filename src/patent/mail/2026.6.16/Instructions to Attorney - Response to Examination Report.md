# Instructions to Attorney — Response to First Examination Report

**To**: Mark Teoh, Laminar IP  
**From**: Jay Tian, Letsdex Pty Ltd  
**Date**: [Date]  
**Re**: Australian Patent Application No. 2026201831 — Response to First Examination Report  
**Our Ref**: P120867AU

---

Dear Mark,

Thank you for forwarding the First Examination Report dated 1 May 2026. I have reviewed the report and the cited prior art documents (D1: CN 113806699 A; D2: US 2020/0137064 A1) in detail. Below please find my technical analysis and instructions for preparing the response.

I would like to proceed with having your firm prepare and file the response. To facilitate your work and manage costs, I have set out below the substantive technical arguments against each objection.

---

## A. Clarity Objections — Proposed Amendments

### Claim 4 — "on a public user key"

The examiner notes that signature verification is performed *using* a public key, not *on* a public key. This is a wording issue.

**Proposed amendment**: Replace `"performing signature validity verification on a user public key"` with `"performing signature validity verification using a user public key"`.

---

### Claim 5 — Dependence and antecedent basis

Two issues are raised:

1. **Antecedent basis**: "the state verification result" lacks antecedent basis when appended to claim 2, as this term is first introduced in claim 4. The examiner has construed claim 5 as appended to claim 4.

2. **"collateral assets corresponding to the user"**: The examiner notes ambiguity as to whether the collateral belongs to the user who submitted the state assertion or to a validator.

**After reviewing the specification**: The description at paragraph [0231]-[0232] of the English specification explicitly states that "the collateral assets of the fraudulent voting validator need to be confiscated." The word "user" in claim 5 is a drafting error — the intended subject is the validator. We have two options:

- **Option A (Recommended)**: Amend claim 5 to depend on claim 4, and change "user" to the appropriate subject. This requires careful alignment with the specification.
- **Option B**: Amend claim 5 to depend on claim 4, and clarify that the term refers to the submitter of the state assertion, with corresponding support identified in the specification.

I would appreciate your advice on which option is better supported under Australian practice and the specification as filed. The description at paragraph [0231]-[0232] discusses confiscating collateral of a fraudulent voting validator upon a failed state verification, so Option A should be supportable.

---

### Claims 9-10 — "Target threshold" proportional relationships

The examiner correctly identifies that it is unclear whether each proportional relationship in claim 10 applies to every type of threshold listed in claim 9 or only to some.

**Proposed amendment**: The specification at paragraphs [0261]-[0273] provides detailed worked examples for each threshold type against each factor. The claim should be amended to expressly state the applicable relationships. For example:

> The validator quantity threshold is directly proportional to the economic value of the business operation;  
> the consensus ratio threshold is directly proportional to the economic value of the business operation;  
> the verification score threshold is directly proportional to the economic value of the business operation;  
> ... (and correspondingly for the risk level, user collateral asset ratio, and time urgency factors).

Please advise on the preferred drafting approach under Australian practice — whether to enumerate each relationship explicitly, or whether a clarifying preamble would suffice.

---

## B. Inventive Step Objection — Claims 1-20

The examiner contends that all claims lack an inventive step in view of D1 (CN 113806699 A) combined with D2 (US 2020/0137064 A1). I respectfully disagree. Set out below are the key technical distinctions and arguments.

### The Examiner's Framework

The examiner acknowledges that D1 alone does not disclose:

(a) Storing the digitally signed VC in a **distributed storage system** (D1 stores VCs and Claims on blockchains);  
(b) Validators accessing that **distributed storage system** using the credential identifier to determine the digitally signed VC;  
(c) The VC including a **state assertion** and a **content hash** of that state assertion; and  
(d) Signing the VC using a **user private key corresponding to the DID**.

The examiner then relies on D2 to supply these missing features, asserting that D2 teaches IPFS-based distributed storage, content addressing, and private key signing. The examiner concludes that the combination renders the claimed invention obvious.

We submit that this conclusion is based on impermissible hindsight and fails to recognise the substantive technical differences between the claimed invention and the cited combination.

---

### Argument 1: The VC Data Structure — Content Hash of State Assertion — Is Not Disclosed or Suggested by D1 or D2

This is, in my view, the strongest point of distinction and should be the centrepiece of our response.

**D1's Claim Object Structure** (D1 specification [0014]-[0017]):

```
Claim {
    ClaimID              // primary key / VC identifier
    ClaimSubjectDID      // DID of the described entity
    ClaimContent         // "description characteristics" of the entity
    Credit               // trust level from signature opinions
}
```

D1's `ClaimContent` is merely free-form "description characteristics" of an entity. D1 does **not** perform any hash operation on the Claim content, nor does its data structure include any content hash field.

**The Claimed VC Structure**:

```
VerifiableCredential {
    credentialID         // globally unique VC identifier
    DID                  // decentralized identifier of the user
    stateAssertion       // assertion about verifiable data on the source chain
    contentHash          // = Hash(stateAssertion) — content fingerprint
    digitalSignature     // = Sign(contentHash, userPrivateKey)
}
```

**D2's Use of IPFS**:

D2 uses IPFS to store identity record data off-chain, with identity records on the identity blockchain containing `IPFS addr` and `IPNS addr` fields pointing to off-chain data. IPFS provides content-based addressing (the address is derived from the content hash).

However, D2 does **not** teach or suggest:

- Computing a hash of a **state assertion** (D2 deals with identity certificates, not assertions about on-chain state);
- **Embedding** such a hash **within a VC data structure** as an integrity verification field; or
- Using the embedded hash as part of a **self-contained integrity verification mechanism** where verifiers independently re-compute the hash and compare it against the embedded hash.

The critical difference is:

- **D2**: Uses IPFS content hashes as storage addresses — the hash tells you *where* to find the data.
- **The claimed invention**: Embeds a content hash *inside the VC itself* — the hash tells you *whether the VC content has been tampered with*, independently of the storage system.

This is fundamentally different. The claimed VC is **self-verifying** for content integrity: any party can take the `stateAssertion` from the VC, re-compute its hash, and compare it with the embedded `contentHash`. A mismatch immediately exposes tampering — without needing to trust IPFS, without needing to query a blockchain, without relying on any external integrity guarantee.

**Argument text for the response**:

> D1 discloses a Claim object with a ClaimContent field recording description characteristics of an entity, but does not disclose or suggest computing a content hash of any assertion and embedding it within the credential data structure. D2 discloses using IPFS as a storage layer where content hashes serve as storage addresses, but does not disclose or suggest embedding a content hash within a verifiable credential as an integrity verification mechanism.
>
> The claimed VC structure — in which a content hash is derived by performing a hash operation on the state assertion and embedded within the VC — provides a self-contained content integrity verification capability. Any party receiving the VC can independently verify that the state assertion has not been altered by re-computing its hash and comparing against the embedded content hash, without reliance on the storage system or any external authority. This feature is neither taught nor suggested by D1 or D2, individually or in combination.

---

### Argument 2: The Three-Layer Structured Verification Process Is a Synergistic Security Mechanism

Claim 4 recites a **structured, three-layer verification process**:

1. **Content Integrity Verification**: Re-compute hash(stateAssertion) and compare against the embedded contentHash in the VC. Detects tampering of the VC content.

2. **Signature Validity Verification**: Verify the digital signature using the user's public key (obtained through the DID). Confirms that the VC originates from the legitimate DID holder, preventing identity forgery.

3. **State Consistency Verification**: Compare the stateAssertion in the VC against the actual verifiable data on the source chain. Confirms that the assertion is factually true, preventing fraudulent assertions.

**D1's "Verification"** (D1 specification [0035]-[0042], [0084]-[0086]):

D1's signers and verifiers perform "verification" and then express acceptance or rejection (a binary "Stand" field). D1 does **not** define any structured verification steps, nor does it break verification down into distinct layers addressing different security dimensions.

**D2's "Verification"** (D2 specification [0079], [0083]-[0095]):

D2 verifies: (i) that a request is signed with the user's private key, (ii) that the user holds a valid certificate from an administrator, and (iii) that the user has the requisite permissions. This is identity-and-permission verification — it does not involve cross-chain state verification or content integrity verification through embedded hashes.

**Why the three layers are synergistic**:

Each layer addresses a distinct attack vector, and the three layers together provide security that no single layer or pair of layers can achieve:

- An attacker who forges a signature (bypassing Layer 2) is caught by Layer 1 (content hash mismatch if the assertion was altered) or Layer 3 (assertion doesn't match on-chain data).
- An attacker who submits a genuine but outdated assertion (bypassing Layers 1 and 2) is caught by Layer 3 (assertion no longer matches current on-chain state).
- An attacker who compromises the storage system (bypassing Layer 1's reliance on IPFS) is caught by Layer 2 (signature won't verify for altered content).

The three layers operate **independently yet cooperatively**, each covering a vulnerability that the others do not address. This synergistic security effect is not suggested by the simple, single-dimensional verification approaches in D1 and D2.

**Argument text for the response**:

> Neither D1 nor D2, alone or in combination, discloses or suggests a structured three-layer verification process comprising content integrity verification (hash comparison), signature validity verification (ECDSA recovery using DID-resolved public key), and state consistency verification (assertion vs. actual on-chain data).
>
> D1 merely teaches binary acceptance/rejection of claims without specifying what verification steps are performed or how they are structured. D2 teaches signature and certificate verification in a single-chain identity management context, without any cross-chain state consistency dimension.
>
> The claimed three-layer verification provides a synergistic technical effect: each layer independently addresses a distinct security dimension (tampering, identity forgery, and factual fraud respectively), and the three layers collectively provide comprehensive security that no single layer or pair of layers can achieve. This structured, multi-dimensional approach to cross-chain verification is neither taught nor suggested by the cited art.

---

### Argument 3: No Motivation to Combine D1 and D2 — Different Technical Problems, Incompatible Architectures

The test for obviousness under Australian law requires that the person skilled in the art would have been **motivated** to combine the teachings of D1 and D2 with a **reasonable expectation of success**. We submit that this threshold is not met.

**D1 addresses**: Extending single-chain VC verification to a multi-chain environment. The solution is a **relay-chain architecture** where a dedicated DID blockchain serves as an intermediary between business blockchains. VCs and Claims are stored on the business blockchains, published via consensus (Tendermint), and signers/verifiers query the DID relay chain to locate the relevant VC on the appropriate business chain.

**D2 addresses**: Reducing blockchain storage burden for identity records by storing the actual identity data off-chain (IPFS/IPNS) while keeping only addresses on-chain. D2 is an identity management system — it does not deal with cross-chain operations, state assertions, or verification of on-chain facts.

**Why the skilled person would not combine them**:

1. **Different technical domains**: D1 operates in the domain of cross-chain interoperability. D2 operates in the domain of identity data storage scalability. A skilled person working on cross-chain verification would not naturally look to an identity storage system for solutions.

2. **Architectural incompatibility**: D1's verification architecture is fundamentally dependent on on-chain storage of VCs and Claims. Signers and verifiers retrieve objects from specific blockchains (routed via the DID relay chain), and verification opinions are published back to blockchains via consensus. Moving VC storage off-chain to IPFS would break D1's consensus-dependent verification flow — signers could no longer retrieve Claims "from the target blockchain" (D1 [0036]), and the consensus publication step would lose its on-chain anchor.

3. **D1 does not identify on-chain VC storage as a problem**: The motivation to move data off-chain (the problem D2 solves) arises only when on-chain data volume creates scalability issues. D1 does not identify VC storage volume as a problem, nor does it suggest any need to move VCs off-chain. The skilled person would have no reason to seek a solution from D2.

4. **Hindsight reconstruction**: The examiner's combination requires: (a) recognising that D1's on-chain VC storage is somehow deficient (which D1 itself does not suggest), (b) looking to D2 (an identity management document) for a remedy, (c) extracting D2's IPFS storage of identity records and applying it to D1's VCs, and (d) further modifying D1's consensus architecture to accommodate off-chain VC retrieval and independent verification. This multi-step reconstruction, achievable only with knowledge of the present invention, is the hallmark of impermissible hindsight.

**Argument text for the response**:

> The person skilled in the art would not have been motivated to combine D1 and D2 with a reasonable expectation of success.
>
> Firstly, D1 and D2 address different technical problems in different domains — D1 addresses cross-chain VC verification through a relay-chain architecture, while D2 addresses identity record storage scalability through off-chain data storage. A skilled person working on the problem of cross-chain state verification would not naturally consult an identity storage document for a solution.
>
> Secondly, D1 and D2 embody incompatible architectural paradigms. D1's verification mechanism depends on on-chain storage of VCs and consensus-based publication of verification opinions. Moving VC storage off-chain to IPFS (as per D2) would undermine D1's consensus-dependent verification flow. D1 provides no suggestion or motivation to depart from its on-chain storage paradigm.
>
> Thirdly, the combination asserted by the examiner can only be constructed through an impermissible exercise in hindsight, using the claimed invention as a template to selectively extract features from disparate documents addressing unrelated problems. The multi-step reconstruction required — recognising an unstated deficiency in D1, seeking a solution from an unrelated document (D2), and fundamentally altering D1's architecture to accommodate the imported feature — is not something the skilled person would have undertaken without inventive effort.

---

### Argument 4: The Claimed Invention Eliminates the Relay Chain — A Fundamental Architectural Departure

D1's core architectural element is the DID blockchain acting as a **relay** between business blockchains. As shown in D1 Figure 2 and described at [0056], the DID relay chain is essential to D1's operation: signers query the DID chain to locate the target blockchain storing a given VC (D1 [0035]), and verifiers similarly query the DID chain to locate signature declarations (D1 [0039]).

The claimed invention eliminates the relay chain entirely:

- The VC is stored in a distributed storage system (IPFS), accessed directly via its credential identifier — no relay chain needed for routing.
- Validators independently access IPFS to retrieve the VC, and independently query the source chain to verify the state assertion.
- Verification is self-contained: the VC's content hash and digital signature make it self-verifying without reliance on any intermediary blockchain.

This is not a minor modification of D1's architecture — it represents a fundamentally different technical approach. D2's use of IPFS for storing identity records does not teach or suggest eliminating a cross-chain relay, because D2 does not operate in a cross-chain context at all.

**Argument text for the response**:

> D1's cross-chain verification architecture is fundamentally dependent on a DID blockchain serving as a relay to route verification requests between chains. In contrast, the claimed invention eliminates the need for any relay chain by storing self-verifying VCs in a distributed storage system, enabling validators to independently retrieve and verify VCs without intermediary blockchain routing.
>
> This architectural departure is enabled by the specific VC structure — embedding both a content hash (for integrity) and a digital signature (for authenticity) — which makes the VC self-verifying. This architectural approach is neither disclosed nor suggested by D1 (which requires a relay chain) or D2 (which uses IPFS in a single-chain identity context without any cross-chain dimension).

---

### Argument 5: Dependent Claims Add Non-Obvious Features Not Disclosed in D1 or D2

The examiner summarily characterises the features of dependent claims 3-16 as "either disclosed in the above cited documents or common general knowledge/obvious choices." This characterisation is unsupported. Below is a claim-by-claim analysis:

| Claim | Feature | D1 | D2 | Notes |
|-------|---------|----|----|-------|
| **3** | Dynamically determining the number of validators based on business type | ✗ | ✗ | D1 uses a fixed verification flow with no dynamic validator selection. |
| **4** | Three-layer structured verification (integrity + signature + state) | ✗ | ✗ | Addressed in Argument 2 above. |
| **5** | Confiscating collateral upon fraudulent state assertion | ✗ | ✗ | Neither D1 nor D2 has any collateral/staking mechanism. |
| **6** | Voting validator threshold + verification consensus condition | ✗ | ✗ | D1 records AcceptCount/DeclineCount but has no threshold-based execution condition. D1 merely tracks counts without using them to gate business operations. |
| **7** | Consensus ratio (approval count / voting count) > threshold | ✗ | ✗ | D1 has no ratio-based consensus condition. |
| **8** | Voting weights based on validator credit scores | ✗ | ✗ | D1 has a Credit field on Claims (trust in the *claim content*), not a credit score for *validators*. There is no voting weight calculation in D1. |
| **9-10** | Adaptive thresholds based on economic value, risk level, collateral ratio, and time urgency | ✗ | ✗ | **Neither document has any concept of dynamically adjusting verification parameters based on business characteristics.** This is a significant technical contribution. |
| **11** | Expanding validator scope upon timeout (adding new validators) | ✗ | ✗ | D1 has no timeout mechanism. |
| **12** | Escalating to highly-qualified validators (high credit score or high collateral) upon timeout | ✗ | ✗ | D1 has no validator qualification hierarchy. |
| **13** | Cooling-off period preventing repeated verification of the same VC | ✗ | ✗ | A specific anti-abuse mechanism not present in either document. |
| **14** | Anti-replay: credential state mapping table marking VCs as used | ✗ | ✗ | D1 has no mechanism to prevent reuse of VCs. |
| **15** | Differentiated incentive rewards (first incentive for timely voting validators > second incentive for late voters) | ✗ | ✗ | Neither D1 nor D2 has any economic incentive mechanism for validators. |
| **16** | Validator credit score adjustment: increase for honest validators; decrease/confiscate/expel for fraudulent validators | Partial | ✗ | D1 increments/decrements a Claim-level Credit field based on signer opinions — this tracks trust in *claims*, not validator reputation. D1 has no validator-level credit system, no collateral confiscation, and no expulsion mechanism. |

The examiner's assertion that these features are "common general knowledge" or "obvious choices" is made without any supporting evidence or reasoning. Each of claims 3-16 adds specific, non-trivial technical features that address concrete technical problems — dynamic security calibration, anti-abuse, incentive alignment, and reputation management — none of which are addressed by the cited prior art.

**Argument text for the response**:

> The examiner asserts without specific analysis that dependent claims 3-16 and 19-20 add only features that are "disclosed in the above cited documents or are common general knowledge/obvious choices." We respectfully submit that this assertion is not supported by the cited documents.
>
> In particular:
> - Claims 9-10 (adaptive multi-factor threshold adjustment) represent a significant technical contribution not remotely suggested by D1 or D2. The concept of dynamically calibrating verification intensity (number of validators, consensus thresholds, verification score thresholds) based on multiple business-specific factors — economic value, risk level, user collateral ratio, and time urgency — is absent from both documents.
> - Claims 11-13 (timeout-based validator expansion, escalation to highly-qualified validators, and cooling-off periods) address practical robustness and anti-abuse concerns in a decentralised verification network, and are not disclosed in D1 or D2.
> - Claims 14-16 (anti-replay, differentiated incentives, and validator reputation management) establish a complete economic security model for the verification network that is entirely absent from D1 and D2.
>
> None of these features can properly be dismissed as "common general knowledge" or "obvious choices" without specific evidence of their notoriety in the art at the priority date.

---

### Argument 6 (Supplementary): The Claimed Invention Addresses State Verification, Not Identity Verification

D1's title and focus is "cross-blockchain **identity verification**" (跨区块链**身份验证**). D1's VC describes **who an entity is** — its ClaimContent records description characteristics of an entity.

The claimed invention addresses **cross-chain state verification** — verifying **facts about what exists or has occurred on a source chain** (e.g., "User owns NFT #1234", "Account holds 100 USDT", "User is a DAO member"). The state assertion in the claimed VC is not about identity attributes — it is about verifiable on-chain data.

This is a fundamental difference in the *nature* of the information carried by the VC, which in turn dictates fundamentally different verification requirements. Verifying an identity claim (D1) does not require checking consistency against on-chain state data. Verifying a state assertion (claimed invention) necessarily requires state consistency verification — the third layer of the claimed three-layer process. D1's verification framework, designed for identity claims, simply does not contemplate this requirement.

While this distinction may be more appropriately used as supporting context rather than a standalone argument, it reinforces why the claimed verification process differs substantively from D1.

---

## C. Recommended Approach

### Proposed claim amendments

1. **Claim 4**: "on" → "using" (trivial wording fix).

2. **Claim 5**: Amend dependency to claim 4 and clarify the collateral subject. I request your advice on the preferred approach (see Section A, Claim 5 above).

3. **Claims 9-10**: Clarify whether each proportional relationship applies to all threshold types or specific ones, consistent with the detailed examples in the specification at paragraphs [0261]-[0273].

### Proposed arguments against the inventive step objection

The core arguments (Arguments 1-5 in Section B above) should be presented, with particular emphasis on:

1. **Argument 1** (VC content hash structure — the strongest distinguishing feature)  
2. **Argument 2** (three-layer synergistic verification)  
3. **Argument 3** (lack of motivation to combine — architectural incompatibility)  
4. **Argument 5** (dependent claims — in particular claims 9-10)

### Fallback positions

If the examiner is not persuaded as to the independent claims, we may consider:

- **Fallback A**: Incorporating the three-layer verification steps of claim 4 into independent claims 1 and 2.
- **Fallback B**: Incorporating the adaptive threshold features of claims 9-10 into independent claims 1 and 2.
- **Fallback C**: A combination of Fallbacks A and B for maximum inventive step, though with narrower claim scope.

I would appreciate your advice on which fallback strategy is most likely to succeed under current Australian Patent Office practice.

---

## D. Request for Advice

I would be grateful for your advice on the following:

1. Whether the proposed clarity amendments to claims 4, 5, and 9-10 are consistent with Australian practice and supported by the specification as filed.

2. Whether the technical arguments set out in Section B above are likely to be persuasive to the Australian Patent Office, and whether any additional arguments or evidence (e.g., declarations, secondary indicia of inventiveness) would strengthen our position.

3. The recommended fallback strategy for claim amendment if the independent claims face continued objection.

4. An updated cost estimate for preparing the response incorporating the above technical analysis.

5. A realistic timeline for preparing and filing the response, and your assessment of how many examination rounds may be needed based on the nature of the objections.

---

I look forward to receiving your advice and proceeding with the response. Please do not hesitate to contact me if you require any clarification on the technical aspects discussed above.

Best regards,

Jay Tian  
Letsdex Pty Ltd
