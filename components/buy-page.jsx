"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { CreditCard, Banknote, Shield, Zap, X, ChevronDown } from "lucide-react"

const supportedAssets = [
  // Core networks
  { name: "Ethereum", symbol: "ETH", network: "ethereum", logo: "https://assets.coingecko.com/coins/images/279/large/ethereum.png" },
  { name: "BNB Chain", symbol: "BNB", network: "bsc", logo: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png" },
  { name: "Polygon", symbol: "MATIC", network: "polygon", logo: "https://assets.coingecko.com/coins/images/4713/large/polygon.png" },
  { name: "Base", symbol: "ETH", network: "base", logo: "/base-logo.png" },
  { name: "Arbitrum", symbol: "ETH", network: "arbitrum", logo: "/arbitrum-arb-logo.png" },
  { name: "Optimism", symbol: "ETH", network: "optimism", logo: "https://assets.coingecko.com/coins/images/25244/large/Optimism.png" },
  { name: "Linea", symbol: "ETH", network: "linea", logo: "https://cryptologos.cc/logos/linea-linea-logo.png" },
  { name: "Avalanche", symbol: "AVAX", network: "avalanche", logo: "https://assets.coingecko.com/coins/images/12559/large/coin-round-red.png" },

  // USDT
  { name: "USDT (Ethereum)", symbol: "USDT", network: "ethereum", logo: "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png" },
  { name: "USDT (BNB Chain)", symbol: "USDT", network: "bsc", logo: "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png" },
  { name: "USDT (Polygon)", symbol: "USDT", network: "polygon", logo: "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png" },

  // USDC
  { name: "USDC (Ethereum)", symbol: "USDC", network: "ethereum", logo: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png" },
  { name: "USDC (BNB Chain)", symbol: "USDC", network: "bsc", logo: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png" },
  { name: "USDC (Polygon)", symbol: "USDC", network: "polygon", logo: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png" },
]

export default function BuyPage() {
  const [showWidget, setShowWidget] = useState(false)
  const [showAssetModal, setShowAssetModal] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState(supportedAssets[0])

  const handleOpenWidget = () => setShowWidget(true)
  const handleCloseWidget = () => setShowWidget(false)
  const handleSelectAsset = (asset) => {
    setSelectedAsset(asset)
    setShowAssetModal(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative">
      {/* === Buy Widget Modal === */}
      {showWidget && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
          <div className="relative w-full max-w-2xl bg-background rounded-2xl overflow-hidden shadow-2xl">
            <button onClick={handleCloseWidget} className="absolute top-3 right-3 text-white hover:text-primary transition">
              <X className="h-6 w-6" />
            </button>

            <iframe
              src={`https://global.transak.com?apiKey=TRANSAK_API_KEY&defaultCryptoCurrency=${selectedAsset.symbol}&networks=${selectedAsset.network}&defaultFiatAmount=100&isFeeCalculationHidden=true&isBuyOrSell=BUY`}
              width="100%"
              height="600"
              allow="camera;microphone;payment"
              style={{ border: "none", borderRadius: "16px" }}
            />
          </div>
        </div>
      )}

      {/* === Asset Selector Modal === */}
      {showAssetModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-background rounded-2xl p-4 w-full max-w-md max-h-[80vh] overflow-y-auto shadow-lg space-y-4 hide-scrollbar">
            <div className="flex justify-between items-center pb-2 border-b">
              <h2 className="text-lg font-semibold">Select Asset</h2>
              <button onClick={() => setShowAssetModal(false)}>
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {supportedAssets.map((asset, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectAsset(asset)}
                  className="flex items-center gap-3 p-3 rounded-xl border hover:bg-muted transition"
                >
                  <div className="w-8 h-8 relative">
                    <Image
                      src={asset.logo}
                      alt={asset.name}
                      width={32}
                      height={32}
                      className="rounded-full object-contain"
                      onError={(e) => (e.currentTarget.src = "/logos/fallback.svg")}
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm">{asset.name}</p>
                    <p className="text-xs text-muted-foreground">{asset.symbol.toUpperCase()}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* === Main Page === */}
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-cyan-500 flex items-center justify-center shadow-lg">
            <CreditCard className="h-8 w-8 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Buy Crypto</h1>
            <p className="text-muted-foreground text-lg">
              Purchase crypto easily using card or local payment methods.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center space-y-2">
            <Zap className="h-6 w-6 text-primary mx-auto" />
            <p className="text-sm font-medium">Instant</p>
            <p className="text-xs text-muted-foreground">Receive crypto fast</p>
          </Card>
          <Card className="p-4 text-center space-y-2">
            <Shield className="h-6 w-6 text-accent mx-auto" />
            <p className="text-sm font-medium">Secure</p>
            <p className="text-xs text-muted-foreground">Bank-level protection</p>
          </Card>
        </div>

        {/* Asset Selector */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground text-center">Select asset to buy</p>
          <Button variant="outline" className="w-full justify-between text-base" onClick={() => setShowAssetModal(true)}>
            <div className="flex items-center gap-2">
              <Image
                src={selectedAsset.logo}
                alt={selectedAsset.name}
                width={24}
                height={24}
                className="rounded-full"
                onError={(e) => (e.currentTarget.src = "/logos/fallback.svg")}
              />
              {selectedAsset.name}
            </div>
            <ChevronDown className="h-4 w-4 opacity-70" />
          </Button>
        </div>

        {/* Buy Button */}
        <div className="space-y-6">
          <Button
            onClick={handleOpenWidget}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-green-500 to-cyan-500 text-white shadow-lg hover:opacity-90 transition-all duration-200 md:h-16 md:text-xl"
          >
            <div className="flex items-center gap-2">
              <Banknote className="h-5 w-5" />
              Buy {selectedAsset.symbol}
            </div>
          </Button>

          {/* Payment Methods */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground text-center">Supported payment methods</p>
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span>Credit Card</span>
              <span>•</span>
              <span>Debit Card</span>
              <span>•</span>
              <span>Bank Transfer</span>
            </div>
          </div>

          {/* Info */}
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              Powered by <strong>Transak</strong> — trusted global on-ramp provider.
            </p>
            <p className="text-xs text-muted-foreground">
              KYC verification may be required for large purchases.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
