---
layout: post
title: Building a Barcode Scanner in Swift
category: apple
tags:
- vision
- tutorial
- iOS
---

Barcodes are everywhere. They provide a uniform, easy way for machine to read information about real word products. Barcodes, thanks to the decimal code underneath the bars, are also interpretable by humans, which makes them wildly used virtually everywhere.

Barcodes are, perhaps surprisingly, a form of binary code. They consist of multiple lines stacked vertically. If a line is black its value is 1 where blank stands for 0. Thicker lines are just a series sequential 1’s.

<img src="/assets/images/barcode.png" alt="barcode" style="max-width: 200px; margin: auto; display: block;">

Typically scanners are used to scan barcodes. However, with the rise of smartphones and the rapid improvements in camera resolutions, we can nowadays read the barcodes without needing a scanner. This might be useful in a supermarket where customers can scan their products themselves. Or in factories where the employees can get additional information about a part using only their phone which they already know and love.

In this tutorial I’m going to show you how to make a barcode reader yourself using Swift and Apple’s awesome Vision framework. We start by decoding the barcode. After that, we check for the _payload_ in the product catalog. Finally, we display information about a product to the user.

I created a starter app [which is available on GitHub](https://github.com/rickwierenga/BarcodeScanner) which displays the live camera view on the screen. It also has an extendable product catalog, more on that later.

> Because we’ll be working with a camera in this tutorial, a physical device is needed in order to follow along.  

## Introduction to Vision
Vision is a relatively new framework by Apple for working with visuals and artificial intelligence. Assuming you’re new with Vision, this image illustratos how most of Vision works:

![](/assets/images/vision.jpg)

You start by defining some subclass of `VNImageBasedRequest` which basically is a way to tell Vision what data you want to get out of the image. The image itself should be a `CIImge` (Core Image image, similar to `UIImage`). You give both objects to Vision and tell it to perform the request on an image. Vision returns a subclass of `VNObservation`, depending on the input.

## Making the request
Start by importing Vision at the top of `ViewController.swift`:
```swift
import Vision
```

Then we need to define our request, in this case a `VNDetectBarcodesRequest`. Because we only want to initialize this request when we’re using it, we’re defining it as a `lazy` variable. (You can read more about those [here](https://www.hackingwithswift.com/example-code/language/what-are-lazy-variables)). At initialization we already provide the completion handler. We first check for errors, potentially display an error and when we determined there are no errors we update our view controller.
```swift
lazy var detectBarcodeRequest: VNDetectBarcodesRequest = {
    return VNDetectBarcodesRequest(completionHandler: { (request, error) in
        guard error == nil else {
            self.showAlert(withTitle: "Barcode Error", message: error!.localizedDescription)
            return
        }

        self.processClassification(for: request)
    })
}()
```

Xcode probably complains the method `processClassification(for:)` doesn’t exist yet, so let’s add a placeholder.

```swift
 // MARK: - Vision
func processClassification(for request: VNRequest) {
    // TODO: Extract payload
}
```

The starter project provides us with a `UIImage` captured from the live video stream when the user taps the shutter button. Replace `// TODO: Process image.` with

```swift
// Convert image to CIImage.
guard let ciImage = CIImage(image: image) else {
    fatalError("Unable to create \(CIImage.self) from \(image).")
}
```

We now have a `CIImage`-image to work with. We use this to make the actual request. Add the following beneath the convertion to `CIImage`.

> Note: The recognition can consume a lot of resources so we make the request on a background thread.  

```swift
// Perform the classification request on a background thread.
DispatchQueue.global(qos: .userInitiated).async {
    let handler = VNImageRequestHandler(ciImage: ciImage, orientation: CGImagePropertyOrientation.up, options: [:])

    do {
        try handler.perform([self.detectBarcodeRequest])
    } catch {
        self.showAlert(withTitle: "Error Decoding Barcode", message: error.localizedDescription)
    }
}
```

Once Vision finishes, it automatically calls the completion handler. Let’s implement that so we can see some results.

## Extracting the payload
In Vision land the numbers under the bars are the payload (the bars themselves are the code too, though in base 2).

Let’s implement the `processClassification(for:) method which right now is just a placeholder. However, before we can do this, you’ll need a little more background information on Vision. Vision very often returns not just 1, but multiple results in an array. Those are filtered ascendingly based on their confidence score. We are only interested in the result with the highest confidence, so we’ll take the first result.

We’ll also have to switch back to the main thread because we’re working with UI again.

Replace our placeholder in `processClassification(for:)` with
```swift
DispatchQueue.main.async {
    if let bestResult = request.results?.first as? VNBarcodeObservation,
        let payload = bestResult.payloadStringValue {
        self.showInfo(for: payload)
    } else {
        self.showAlert(withTitle: "Unable to extract results",
                       message: "Cannot extract barcode information from data.")
    }
}
```

Depending on the image, there might or might not be a barcode in this picture. Also, the bar code might not be recognized correctly. Therefore, we have to carefully unwrap the results and we show an alert to the user if we don’t get any good results.

## The product catalog
Now that we’re able to extract the payload, we can get information about the product. Because this tutorial if focused on Vision, I went ahead and already implemented a `ProductCatalog` struct which serves as a database abstraction. It loads the data from `ProductCatalog.plist`. The `Product` struct will contain information about the product. If you’re interested, please take a look at how those structs are implemented.

The public api of the `ProductCatalog` is simple:
```swift
let productCatalog = ProductCatalog()
if let product = productCatalog.item(forKey: payload) {
  // do something with the product
}
```

Let’s start by defining the product catalog at the top of the view controller:
```swift
let productCatalog = ProductCatalog()
```

We use this api in our view controller as follows:
```swift
private func showInfo(for payload: String) {
    if let product = productCatalog.item(forKey: payload) {
        print(payload)
        showAlert(withTitle: product.name ?? "No product name provided", message: payload)
    } else {
        showAlert(withTitle: "No item found for this payload", message: "")
    }
}
```

## Where to go from here
Although this app is functional, it’s far from a complete app, it’s just the beginning. You can extend the `Product` to hold more information on a product (make sure to add this information in the plist as well). You can also add some of your own products to the plist file. One easy way to do this, is to prompt the user to enter information when a payload is extracted that doesn’t appear in the database.

Another idea for an app that can be built using this technology is an app that scans books, fetches details about the book (payloads starting with 978–979 are ISBNs!) and displays those to the user.

You can also extract the country code and tell the user which country their product is from.

## Conclusion
As you’ve seen, it’s quite easy to work with barcodes in Swift thanks to Apple’s Vision framework. You can find the finished project in the [‘finished’ branch of this project on GitHub](https://github.com/rickwierenga/BarcodeScanner/tree/finished).

I’d love to hear about apps you make using this technology! Good luck!






