---
# title: remote
# editLink: true
outline: deep
---
# Solidity ERC20源码

```solidity
pragma solidity ^0.5.4;
contract TokenTest {
    string public name;
    string public symbol;
    uint8  public decimals = 18;  // decimals 可以有的小数点个数，最小的代币单位。18 是建议的默认值
    uint256 public totalSupply;
    address  payable public owner;
    // 用mapping保存每个地址对应的余额
    mapping (address => uint256) public balanceOf;
    // 存储对账号的控制
    mapping (address => mapping (address => uint256)) public allowance;
    /**
     * 初始化构造
     */
    constructor(uint256 initialSupply, string memory tokenName , string  memory tokenSymbol) public {
        totalSupply = initialSupply * 10 ** uint256(decimals);  // 供应的份额，份额跟最小的代币单位有关，份额 = 币数 * 10 ** decimals。
        balanceOf[msg.sender] = totalSupply;    
        name = tokenName; // 代币名称
        symbol = tokenSymbol;  // 代币符号
        owner = msg.sender;
    }
    
    /**
     * 代币交易转移的内部实现
     */
    function _transfer(address   _from, address  _to, uint  _value) internal{
        // 确保目标地址不为0x0，因为0x0地址代表销毁
        require(_to != address(0x0));
        // 检查发送者余额
        require(balanceOf[_from] >= _value);
        // 确保转移为正数个
        require(balanceOf[_to] + _value > balanceOf[_to]);

        // 以下用来检查交易，
        uint previousBalances = balanceOf[_from] + balanceOf[_to];
        // Subtract from the sender
        balanceOf[_from] -= _value;
        // Add the same to the recipient
        balanceOf[_to] += _value;

        // 用assert来检查代码逻辑。
        assert(balanceOf[_from] + balanceOf[_to] == previousBalances);
    }
    /**
     *  代币交易转移
     * 从自己（创建交易者）账号发送`_value`个代币到 `_to`账号
     * @param _to 接收者地址
     * @param _value 转移数额
     */
    function transfer(address _to, uint256 _value) public {
        _transfer(msg.sender, _to, _value);
}
    
    function withdraw() payable public{
        require(msg.sender == owner);
        owner.transfer(address(this).balance);
    }
    function SWTBalance(address _from) public view returns (uint256)  {
        return _from.balance;
    }
}
```
