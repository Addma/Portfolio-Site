
export default function Coin({touched}) {
    return (
        touched ? 
        <div id='coin-div' className="nocoin" ></div>
        :
        <div id='coin-div' className="coin"></div>
    )
}