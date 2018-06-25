

pragma solidity ^0.4.21;
pragma experimental ABIEncoderV2;

import './AngelToken.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';

contract SendABox {
    using SafeMath for uint256;
    address public owner;
    address developer;
    address government;
    uint[5] canGiveValue;
    uint public constant SZABO_PER_WEI = 10000000000000000; //  0^16 개ㅑ 0.01 ether = 1 token 

    uint256 box_idx = 0;
    uint[] public boxlist ;
    
    AngelToken public token;

    bool private closed;
    
    event ev_GiveABoxFromDonator(uint256 _box_idx , address indexed _sender , string _message , uint _value , uint _token);

    event ev_GetABox(address indexed _getter , uint256 _boxid , uint256 _value , uint256 _takevalue);
    
    struct ABoxInfo {
     //   uint    AboxNum;
        address donator;
        uint    value;
        //string  message;
    }

    ABoxInfo[] public ABoxList;
    //mapping (uint => ABoxInfo ) boxtest;

    function SendABox(AngelToken _token) public {
        require(_token != address(0));
        token = _token;
        //require(_token.owner != msg.sender);
        owner = msg.sender;
        canGiveValue[0] = 10000000000000000; // 0.01 ether 0이 16개 
        canGiveValue[1] = 100000000000000000; // 0.1 ether 0이 17개 
        canGiveValue[2] = 1000000000000000000; // 1 ether 0이 18개 
        canGiveValue[3] = 10000000000000000000; // 10 ether 0이 19개 
        canGiveValue[4] = 10000000000000000; // 0.01 ether 0이 16개 
   
    }

    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }

    function setcanGiveValue(uint _num , uint _value) public onlyOwner returns (bool) {
        canGiveValue[_num] = _value;
    }

     function getcanGiveValue(uint _num) public onlyOwner returns (uint) {
        return canGiveValue[_num];
    }
/*
    function getABoxInfo(uint num) public view returns (uint , address ) {
        return (boxtest[num].value , boxtest[num].donator);
    }

    
    function getABoxInfoStruct(uint num) public view returns (uint , address ) {

        ABoxInfo memory aaa = boxtest[num];
        return (aaa.value , aaa.donator );
    }
*/
    function getboxlistarray() public returns (uint[]) {
        return boxlist;
    }
    

    function GetAlBox() public returns (bool) {
        msg.sender.transfer(1);
        //msg.sender.transfer(address(this).balance);
        return true;
    }

    function() external payable {
        
        /*
        boxnum += 1;
        var boxbox = boxtest[boxnum];
       // boxbox.AboxNum = boxnum;
        boxbox.value = msg.value;
        boxbox.message = "take this";
       
        boxbox.donator = msg.sender;

        boxlist.push(boxnum);


        emit GiveABoxSender(msg.sender , msg.value , 5);
        */
        //token.tokenadd(msg.sender , msg.value);
        //balances[msg.sender] = msg.value;
        //token.transfer(msg.sender, emmasToTransfer);

        
        giveABox(msg.sender , "no");
    }

    function giveABoxForMessage(string message) external payable {
        require(!closed);
        require(msg.value > 0);

        giveABox(msg.sender , message);
    }

    function giveABox(address _from , string message) payable {
        
        require(!closed);
        require(msg.value == canGiveValue[0] || msg.value == canGiveValue[1] || msg.value == canGiveValue[2] || msg.value == canGiveValue[3] || msg.value == canGiveValue[4]); 
          
        uint256 amount = msg.value;
        
        ABoxInfo memory boxinfo = ABoxInfo(_from , amount);
        
        var _id = ABoxList.push(boxinfo);

        uint256 tokencnt = amount.div(SZABO_PER_WEI);
       
        token.tokenadd(_from , tokencnt);

        emit ev_GiveABoxFromDonator(_id , msg.sender , message , msg.value , tokencnt);
        
    }

    function takeBox(address _getaddress , uint256 _boxid , uint256 _wei) public onlyOwner returns (bool) {

        uint256 amount = _wei;

        address donator = ABoxList[_boxid].donator;
        uint256 boxvalue = ABoxList[_boxid].value;
        
        uint256 takevalue = boxvalue.sub(9);
                
        _getaddress.transfer(amount);

        emit ev_GetABox(_getaddress , _boxid , amount , takevalue);
       
    }

    function getABoxInfo(uint256 _id) public view returns (address , uint256) {

        return (ABoxList[_id].donator , ABoxList[_id].value);
    }
}