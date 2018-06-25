pragma solidity ^0.4.21;

import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';


contract AngelToken is StandardToken {

    uint public INITIAL_SUPPLY = 21000000;
    string public name = 'AngelToken';
    string public symbol = 'ANG';
    uint8 public decimals = 8;
    address owner;
    bool public tradeYN = true;

    function AngelToken() public {
        totalSupply_ = INITIAL_SUPPLY * 10 ** uint(decimals);
        balances[msg.sender] = INITIAL_SUPPLY;
        owner = msg.sender;
    }

    function changeTradeY() public returns(bool){
        require(owner == msg.sender);
        require(!tradeYN);
        tradeYN = true;
        return tradeYN;
    }

    function changeTradeN() public returns(bool){
        require(owner == msg.sender);
        require(tradeYN);
        tradeYN = false;
        return tradeYN;
    }

    modifier onlyTradeY() {
        require(tradeYN);
        _;
    }

    function tokenadd(address _to , uint256 _value) public returns (bool) {
        balances[_to] += _value;
        return true;
    }

    function transfer(address to, uint256 value) public onlyTradeY returns (bool) {
        super.transfer(to, value);
    }

    function allowance(address owner, address spender) public onlyTradeY view returns (uint256) {
        super.allowance(owner, spender);
    }

    function transferFrom(address from, address to, uint256 value) public onlyTradeY returns (bool) {
        super.transferFrom(from, to, value);
    }

    function approve(address spender, uint256 value) public onlyTradeY returns (bool) {
        super.approve(spender, value);
    }
}