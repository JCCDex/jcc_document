---
# title: remote
# editLink: true
outline: deep
---
# 底层常见错误附录
|错误名称 |说明 |
| :----| :----|
|tecCLAIM	|Fee claimed. Sequence used. No action.
|tecDIR_FULL	|Can not add entry to full directory.
|tecFAILED_PROCESSING	|Failed to correctly process transaction.
|tecINSUF_RESERVE_LINE	|Insufficient reserve to add trust line.
|tecINSUF_RESERVE_OFFER	|Insufficient reserve to create offer.
|tecNO_DST	|Destination does not exist. Send SWT to create it.
|tecNO_DST_INSUF_SWT	|Destination does not exist. Too little SWT sent to create it.
|tecNO_LINE_INSUF_RESERVE	|No such line. Too little reserve to create it.
|tecNO_LINE_REDUNDANT	|Can't set non-existent line to default.
|tecPATH_DRY	|Path could not send partial amount.
|tecPATH_PARTIAL	|Path could not send full amount.
|tecMASTER_DISABLED	|Master key is disabled.
|tecNO_REGULAR_KEY	|Regular key is not set.
|tecUNFUNDED	|One of _ADD, _OFFER, or _SEND. Deprecated.
|tecUNFUNDED_ADD	|Insufficient SWT balance for WalletAdd.
|tecUNFUNDED_OFFER	|Insufficient balance to fund created offer.
|tecUNFUNDED_PAYMENT	|Insufficient SWT balance to send.
|tecOWNERS	|Non-zero owner count.
|tecNO_ISSUER	|Issuer account does not exist.
|tecNO_AUTH	|Not authorized to hold asset.
|tecNO_LINE	|No such line.
|tecINSUFF_FEE	|Insufficient balance to pay fee.
|tecFROZEN	|Asset is frozen.
|tecNO_TARGET	|Target account does not exist.
|tecNO_PERMISSION	|No permission to perform requested operation.
|tecNO_ENTRY	|No matching entry found.
|tecINSUFFICIENT_RESERVE	|Insufficient reserve to complete requested operation.
|tecNEED_MASTER_KEY	|The operation requires the use of the Master Key.
|tecDST_TAG_NEEDED	|A destination tag is required.
|tecINTERNAL	|An internal error has occurred during processing.
|tefALREADY	|The exact transaction was already in this ledger.
|tefBAD_ADD_AUTH	|Not authorized to add account.
|tefBAD_AUTH	|Transaction's public key is not authorized.
|tefBAD_LEDGER	|Ledger in unexpected state.
|tefCREATED	|Can't add an already created account.
|tefEXCEPTION	|Unexpected program state.
|tefFAILURE	|Failed to apply.
|tefINTERNAL	|Internal error.
|tefMASTER_DISABLED	|Master key is disabled.
|tefMAX_LEDGER	|Ledger sequence too high.
|tefNO_AUTH_REQUIRED	|Auth is not required.
|tefPAST_SEQ	|This sequence number has already past.
|tefWRONG_PRIOR	|This previous transaction does not match.
|telLOCAL_ERROR	|Local failure.
|telBAD_DOMAIN	|Domain too long.
|telBAD_PATH_COUNT	|Malformed: Too many paths.
|telBAD_PUBLIC_KEY	|Public key too long.
|telFAILED_PROCESSING	|Failed to correctly process transaction.
|telINSUF_FEE_P	|Fee insufficient.
|telNO_DST_PARTIAL	|Partial payment to create account not allowed.
|telBLKLIST	|Tx disable for blacklist.
|telINSUF_FUND	|Fund insufficient.
|temMALFORMED	|Malformed transaction.
|temBAD_AMOUNT	|Can only send positive amounts.
|temBAD_AUTH_MASTER	|Auth for unclaimed account needs correct master key.
|temBAD_CURRENCY	|Malformed: Bad currency.
|temBAD_EXPIRATION	|Malformed: Bad expiration.
|temBAD_FEE	|Invalid fee, negative or not SWT.
|temBAD_ISSUER	|Malformed: Bad issuer.
|temBAD_LIMIT	|Limits must be non-negative.
|temBAD_QUORUM	|Quorums must be non-negative.
|temBAD_WEIGHT	|Weights must be non-negative.
|temBAD_OFFER	|Malformed: Bad offer.
|temBAD_PATH	|Malformed: Bad path.
|temBAD_PATH_LOOP	|Malformed: Loop in path.
|temBAD_SEND_SWT_LIMIT	|Malformed: Limit quality is not allowed for SWT to SWT.
|temBAD_SEND_SWT_MAX	|Malformed: Send max is not allowed for SWT to SWT.
|temBAD_SEND_SWT_NO_DIRECT	|Malformed: No Skywell direct is not allowed for SWT to SWT.
|temBAD_SEND_SWT_PARTIAL	|Malformed: Partial payment is not allowed for SWT to SWT.
|temBAD_SEND_SWT_PATHS	|Malformed: Paths are not allowed for SWT to SWT.
|temBAD_SEQUENCE	|Malformed: Sequence is not in the past.
|temBAD_SIGNATURE	|Malformed: Bad signature.
|temBAD_SRC_ACCOUNT	|Malformed: Bad source account.
|temBAD_TRANSFER_RATE	|Malformed: Transfer rate must be >= 1.0
|temDST_IS_SRC	|Destination may not be source.
|temDST_NEEDED	|Destination not specified.
|temINVALID	|The transaction is ill-formed.
|temINVALID_FLAG	|The transaction has an invalid flag.
|temREDUNDANT	|Sends same currency to self.
|temREDUNDANTSIGN	|Add self as additional sign.
|temSKYWELL_EMPTY	|PathSet with no paths.
|temUNCERTAIN	|In process of determining result. Never returned.
|temUNKNOWN	|The transaction requires logic that is not implemented yet.
|temDISABLED	|The transaction requires logic that is currently disabled.
|temMULTIINIT	|contract code has multi init function
|terRETRY	|Retry transaction.
|terFUNDS_SPENT	|Can't set password, password set funds already spent.
|terINSUF_FEE_B	|Account balance can't pay fee.
|terLAST	|Process last.
|terNO_SKYWELL	|Path does not permit rippling.
|terNO_ACCOUNT	|The source account does not exist.
|terNO_AUTH	|Not authorized to hold IOUs.
|terNO_LINE	|No such line.
|terPRE_SEQ	|Missing/inapplicable prior transaction.
|terOWNERS	|Non-zero owner count.
|tesSUCCESS	|The transaction was applied. Only final in a validated ledger.
|rpcLOW_FEE	|fee field is lower than transaction needed.(手续费过低)
|tefBAD_QUORUM	|Signatures provided do not meet the quorum.(权重未达到阈值)
|tefBAD_SIGNATURE	|A signature is provided for a non-signer.(签名错误)
|tefNOT_MULTI_SIGNING	|Account has no appropriate list of multi-signers.(签名列表不存在)
|tecNO_ALTERNATIVE_KEY	|The operation would remove the ability to sign transactions with the account. (原因：没有设置签名列表)