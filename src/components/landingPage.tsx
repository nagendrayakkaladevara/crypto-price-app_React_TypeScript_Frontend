import React, { useEffect, useState } from 'react';
import BitcoinImage from '../assets/images/bitcoin.png';
import CardanoImage from '../assets/images/cardano.png';
import DogecoinImage from '../assets/images/dogecoin.png';
import EthereumImage from '../assets/images/ethereum.png';
import LitecoinImage from '../assets/images/litecoin.png';
import TetherImage from '../assets/images/tether.png';

interface CoinData {
    usd: number;
    usd_24h_change: number;
}

interface CryptoData {
    [key: string]: CoinData;
}

const CryptoPrice: React.FC = () => {
    const [data, setData] = useState<CryptoData | null>(null);

    useEffect(() => {
        fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Ctether%2Cethereum%2Clitecoin%2Ccardano%2Cdogecoin&vs_currencies=usd&include_24hr_change=true')
            .then(res => res.json())
            .then((json: CryptoData) => setData(json));
    }, []);

    const Image = [{
        name: 'bitcoin',
        Image: BitcoinImage,
    }, {
        name: 'cardano',
        Image: CardanoImage,
    }, {
        name: 'dogecoin',
        Image: DogecoinImage,
    }, {
        name: 'ethereum',
        Image: EthereumImage,
    }, {
        name: 'litecoin',
        Image: LitecoinImage,
    }, {
        name: 'tether',
        Image: TetherImage,
    }]

  
    const ImageFunction = (name: string): string | undefined => {
        const foundImage = Image.find((item:any) => item.name === name);
        return foundImage ? foundImage.Image : undefined;
    }
    

    console.log(ImageFunction('bitcoin'));

    if (!data) return <div className='flex justify-center items-center h-screen'><span className="loader"></span></div>;

    const coins = Object.keys(data);

    return (
        <div className="container mx-auto p-6">
            <p className='flex justify-center text-white p-2 text-lg bungee-tint-regular'>CRYPTO PRICE APP</p>
            {coins.map(coin => {
                const coinInfo = data[coin];
                const price = coinInfo.usd;
                const changeNumber = coinInfo.usd_24h_change; // Original number value
                const change = changeNumber.toFixed(5); // Convert to string for display

                return (
                    <div
                        key={coin}
                        className={`coin flex items-center justify-between p-4 mb-6 rounded-lg shadow-md ${changeNumber < 0 ? 'bg-red-50' : 'bg-green-50'
                            }`}
                    >
                        <div className="flex items-center">
                            <div className="coin-logo mr-4">
                                <img src={`${ImageFunction(coin)}`} alt={coin} className="w-16 h-16" />
                            </div>
                            <div className="coin-name text-left">
                                <h3 className="text-2xl font-bold text-gray-900 uppercase">{coin}</h3>
                                <span className="text-gray-500 text-sm">/USD</span>
                            </div>
                        </div>
                        <div className="coin-price text-right">
                            <span className={`price text-2xl font-bold ${changeNumber < 0 ? 'text-red-600' : 'text-green-600'
                                }`}>${price}</span>
                            <span className="change text-sm text-gray-500 block mt-2">{change}%</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CryptoPrice;