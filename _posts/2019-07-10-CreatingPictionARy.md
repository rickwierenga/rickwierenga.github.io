---
layout: post
title: Creating PictionARy
category: apple
tags:
- wwdc19
---

On April 16th, 2019 an email landed in my inbox. The subject line read: “You’ve been awarded a WWDC19 Scholarship.” What?! Because this was my first time taking part in a programming competition, I didn’t expect to win at all.

For those of you who don’t know what the World Wide Developer Conference is, let me explain it quickly. The World Wide Developer Conference (or WWDC for short) is an annual event organised by Apple for developers. Attendees can meat face-to-face with the teams behind their favourite products.

Tickets to this event usually cost thousands of dollars; however, for the past few years, students and members of educational institutions have had the chance to go there for free through the WWDC Scholarship Program. This year, applicants were asked to build an Xcode Playground. My Playground is a machine learning version of the popular game Pictionary. In this blog post, I’ll be explaining how I built PictionARy. (Note: I left some things out for brevity)

Before we start, make sure to watch the video if you haven’t done so, so that you know what we are building.
<div class="embed-container">
    <iframe id="ytplayer" type="text/html" width="640" height="360"
  src="https://www.youtube.com/embed/GEUrMbx_uac?origin=https://rickwierenga.com"
  frameborder="0"></iframe>
</div>

## Creating up the live camera view
The main component of the UI is the live view. Let’s start by importing `AVFoundation`. 

First we need some properties on our view controller. The comments explain what each property means.
```swift
// The active session
var captureSession: AVCaptureSession!

// The isight camera of the iPad
var backCamera: AVCaptureDevice?

// The preview layer
var cameraPreviewLayer: AVCaptureVideoPreviewLayer?

// The camera output
var captureOutput: AVCapturePhotoOutput?
```

Whenever you are working with media, recording or playing, you need to get a session. Sessions is what iOS uses to keep track of the input and output of the device. This is necessary because you don’t want to have two apps playing music in the background, or having your music playing when you are recording a video. Creating a session is easy:
```swift
captureSession = AVCaptureSession()
captureSession.sessionPreset = .hd1280x720
```

Then we need to access the isight camera of the iPad. Apple’s naming conventions are a little confusing. What you need to know is that Apple calls the cameras on the iPad devices.
First we need to get a device discovery session. Then we’ll ask the discovery session for all the devices it has access to. After that, we’ll need to loop over the devices (cameras) and check if this is the camera we want because some iPads have more than one camera.
Should we not find a camera on this device, our property will have its original value, `nil`, so we’ll need to check if we found a device and else notify the user. I used a helper function to present the alert.
```swift
let deviceDiscoverySession = AVCaptureDevice.DiscoverySession(deviceTypes: [AVCaptureDevice.DeviceType.builtInWideAngleCamera], mediaType: AVMediaType.video, position: .back)
let devices = deviceDiscoverySession.devices
for device in devices {
    if device.position == AVCaptureDevice.Position.back {
        backCamera = device
    }
}

// Make sure the actually is a back camera on this particular iPad.
guard let backCamera = backCamera else {
    cameraError("There seems to be no 📷 on your device. 🥴")
    return
}
```

Once we have access to the isight camera, we are able to connect its output to our preview layer. This might throw an error, so we’ll need to wrap it up in a do-try-catch block.
```swift
do {
    let captureDeviceInput = try AVCaptureDeviceInput(device: backCamera)
    captureSession.addInput(captureDeviceInput)
} catch {
    cameraError(“Your 📷 can’t be used as an input device. 😯”)
    return
}
```

To capture the output (take a photo of the video stream) we need to get a new `AVCapturePhotoOutput` instance. After you get this object, add it to the session.
```swift
captureOutput = AVCapturePhotoOutput()
captureOutput!.setPreparedPhotoSettingsArray([AVCapturePhotoSettings(format: [AVVideoCodecKey: AVVideoCodecType.jpeg])], completionHandler: nil)
captureSession.addOutput(captureOutput!)
```

While we could show the output to our layer now, we don’t do it yet. First, we need to change some properties on our output layer for a better use experience. Once this is done, insert our layer into our main view’s layer.
```swift
cameraPreviewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
cameraPreviewLayer!.videoGravity = .resizeAspectFill
cameraPreviewLayer!.connection?.videoOrientation = .landscapeRight
cameraPreviewLayer?.frame = view.frame

self.view.layer.insertSublayer(cameraPreviewLayer!, at: 0)
```

We are done now, right? Wrong. We forgot to start the session!
```swift
captureSession.startRunning()
```

## Taking a picture
`Vision` requires us to input an image rather than a video stream for image recognition. Because we already started implementing this feature, it’s quite easy to complete it.

First, we’ll need to get notified when the user taps the screen. This is done through the `UITapGestureRecognizer` class.
```swift
let tapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(requestRating))
self.view.addGestureRecognizer(tapGestureRecognizer)
```

We call `requestRating` when the user taps the screen. Now let’s implement that feature.
```swift
let settings = AVCapturePhotoSettings()
captureOutput?.capturePhoto(with: settings, delegate: self)
```

Note that we set `self` as a delegate here. The delegate our view controllers needs to conform to is called `AVCapturePhotoCaptureDelegate`.
```swift
public func photoOutput(_ output: AVCapturePhotoOutput, didFinishProcessingPhoto photo: AVCapturePhoto, error: Error?) {
    if let imageData = photo.fileDataRepresentation(),
        let image = UIImage(data: imageData) {

        // Crop the image becuase the video streaming is in another size.
        let frame = CGRect(x: 0, y: 0, width: self.view.frame.height, height: self.view.frame.width) // Flip width and height because the video layer is rotated.
        guard let cgImage = image.cgImage,
            let croppedCGImage = cgImage.cropping(to: frame) else {
                visionError("🖼 is in a straaaange format...")
                return
        }

        let croppedImage = UIImage(cgImage: croppedCGImage)

        // Update the cropped image.
        updateClassifications(for: croppedImage)
    }
}
```
First we start by getting the data out of the `AVCapturePhoto` which is a low level class. Then we attempt to extract a UIImage from this data. Because our video stream is rotated by 90 degrees to fit the screen, we’ll have to rotate the picture as well. The cropped image we get back is a `CGImage` that we have to turn into a `UIImage`. Luckily, that’s trivial.
When we are done with our preprocessing, we hand to picture over to Vision for the recognition!


## Implementing machine learning
Now let’s get to the juicy stuff: machine learning.

I trained the model I used for this playground myself using CreateML. How I did that is beyond the scope of this blog post but I’ll write another one explaining how I did it.

Because we want to get the confidence score for granting points, we use a classification request. This is a type of machine learning that outputs an array (mathematically a vector).  We declare our classification request upfront so we can use it more than once. This is a lazy variable though, because we only want it to be initialized when it’s being used.
We start by looking for our CoreML model in the bundle and compiling it. Next, we try to create a Vision Core ML request. We want to call `processClassification(for:)` whenever a classification is done. 
``` swift
lazy var classificationRequest: VNCoreMLRequest? = {
    do {
        if let path = Bundle.main.path(forResource: "Drawings", ofType: "mlmodel") {
            // Load the vision model
            let compiledURL = try MLModel.compileModel(at: URL(fileURLWithPath: path))
            let model = try MLModel(contentsOf: compiledURL)
            let visionModel = try VNCoreMLModel(for: model)
            
            // Create a vision coreml request.
            let request = VNCoreMLRequest(model: visionModel, completionHandler: { (request, error) in
                self.processClassifications(for: request, error: error)
            })
            request.imageCropAndScaleOption = .centerCrop
            return request
        } else {
            mlError("Unable to locate 🧠")
            return nil
        }
    } catch {
        visionError(error.localizedDescription)
        fatalError("Failed to load Vision ML model: \(error)")
    }
}()
```

In `updateClassification(for: )`  we create a Vision handler on a background thread because it takes a lot of processing power and we want to keep our UI responsive. Then we fetch our classification request and have the handler perform it.
```swift
DispatchQueue.global(qos: .userInitiated).async {
    let handler = VNImageRequestHandler(ciImage: ciImage, orientation: CGImagePropertyOrientation.up, options: [:])
    do {
        if let classificationRequest = self.classificationRequest {
            try handler.perform([classificationRequest])
        }
    } catch {
        self.visionError(error.localizedDescription)
    }
}
```

Remember the closure callback in the classification request property. This handles the granting of the points. Let’s start implementing that function now.
First, we switch back to the main thread (we did the classification on a background thread). Then we check if our classification returned any results. This is important, because the user might try to fool us by taking a picture of an empty piece of paper for example.
```swift
DispatchQueue.main.async {
    // Check if there are any results. Else show an error alert.
    guard let results = request.results else {
        self.visionError("Couldn't recognize your drawing... 🥺")
        return
    }
    let classifications = results as! [VNClassificationObservation]
    
    if classifications.isEmpty {
        self.visionError("Couldn't recognize your drawing... 🥺")
    } else {
        // look for object.
    }
}
```

The way people usually use a classification request is by taking the object with the highest confidence and predict this object is the object in the image. However, we know what’s supposed to be in the image so we look for this particular object in the results. Then we check its confidence (how sure the model is that the object in the image is this category).
Replace `//look for the object.` with:
```swift
// Seek for the object to get its confidence.
// Linear search if faster than performing quicksort and then doing a binary search. Complexity: O(n)
classifications.forEach({ classification in
    if let currentObject = self.currentObject,
        classification.identifier == currentObject {
        
        // If the intended object is found, show a rating to the user.
        self.rate(withIdentifier: classification.identifier,
                  confidence: classification.confidence as Float)
    }
}
```
As the comment in the code says, it’s more efficient to do a linear search than to sort and then search.

After we get the confidence, we’re ably to grant the points. I’m not going over the implementation of the `rate(withIdentifier:, confidence:)` method in this blog post, but for those of you who want to know how this and the rest of the Playground is implemented, I published [the full code on GitHub](https://github.com/rickwierenga/WWDC19Playground).

## Conclusion
I hope this post was helpful to you and you learned a thing or two.

I’m sure there will be scholarships again next year. Perhaps we’ll meet!

