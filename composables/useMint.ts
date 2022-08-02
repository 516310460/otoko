import NFTABI from '~~/abi/test-abi.json'

export async function useMint(mintNum: number) {
  const walletStore = useWalletStore();
  // 连接小狐狸
  var web3 = new window.Web3(window.ethereum);
  //发送代币的地址
  // var from = state.account;
  //接收代币的地址
  // var to = "0x96B4250b8F769Ed413BFB1bb38c5d28C54f81618";
  //USDT和NF3代币合约地址
  // var contractAddress = "0x495F1eC64467539cAd047629086E3Cd95459E374";
  // 调用合约
  const contract = new web3.eth.Contract(NFTABI, walletStore.contractAddress);
  // contract.methods.remaining().call().then((v: any) => {
  //   console.log(v)
  //   // let ret = new BigNumber(v);
  //   // return parseFloat(ret.dividedBy(Ether)).toFixed(2);
  //   return v
  // }).then((sum: any) => {
  //   console.log(sum);
  // })
  //获取gasPrice，单位为 wei
  let getGasPrice = await web3.eth.getGasPrice();
  contract.methods.freeMint(mintNum).send({
    from: walletStore.address,
    gasPrice: getGasPrice,
    gasLimit: 300000,
  }, function(error, transactionHash){
    if (!error) {
      console.log("交易hash：", transactionHash)
    } else {
      console.log(error)
    }
  }).then(function (receipt) {//监听后续的交易情况
    console.log(receipt)
    console.log("交易状态：", receipt.status)
  });

  // // 转账
  // contract.methods.transfer(to, 1000).send({
  //   from: from
  // }, function(error, transactionHash){
  //   if (!error) {
  //     console.log("交易hash：", transactionHash)
  //     return '1'
  //   } else {
  //     console.log(error)
  //     return '2'
  //   }
  // }).then(function (receipt) {//监听后续的交易情况
  //   console.log(receipt)
  //   console.log("交易状态：", receipt.status)
  // });
}