---
layout: post
title: Compressing images using Python
category: Machine Learning
tags:
- python
- numpy
- pillow
---

Compressing images is a neat way to shrink the size of an image while maintaining the resolution. In this tutorial I’m building an image compressor using Python, [Numpy](http://numpy.org) and [Pillow](https://github.com/python-pillow/Pillow/). We’ll be using machine learning, the unsupervised K-means algorithm to be precise.

If you don’t have Numpy and Pillow installed, you can do so using the following command:
```bash
pip3 install pillow
pip3 install numpy
```

Start by importing the following libraries:
```python
import os
import sys

from PIL import Image
import numpy as np
```

## The K-means algorithm
K-means, as mentioned in the introduction, is an unsupervised machine learning algorithm. Simplified, the major difference between unsupervised and supervised machine learning algorithms is that supervised learning algorithms learn by example (there are labels), and unsupervised learning algorithms learn by trial and error.

I’ll be explaining how the algorithm works based on an example. In the illustration below there are two features, $$x_1$$ and $$x_2$$.

![Unclassified points on a 2d plane](/assets/images/raw.png)

We want to assign each item to one out of two clusters. The most natural way to do this would be something like this:

![Colored points on a 2 plane](/assets/images/grouped.png)

K-means is an algorithm to do exactly this. Note that $$K$$ is the number of clusters we want to have, hence **K** means.

We start by randomly getting $$K$$ training examples and in $$\mu$$ so that the points are $$\mu_1, \mu_2, …, \mu_k$$ and $$\mu \in \mathbb{R}^n$$ where $$n$$ is the number of features. At initialization, the points might be very close to one another, so we have to check if our result looks like how we want it to look because it might stuck be in a local optimum.

Then for a certain number of iterations, execute the following steps:

1. For every training example, assign $$c^{(i)}$$ to the closest centroid.
2. For every centroid $$\mu_k$$, set the location to be the average of examples assigned to it.

As the algorithm progresses, generally the centroids will move to the center of the clusters and the overall distance of the examples to the clusters get smaller.

## K-means for image compression
This technique can also be used for image compression. Each pixel of the image consists of three values, R(ed), B(lue) and G(reen). Those can be seen as the points on the grid, 3D in case of RGB. The objective of image compression in this case is to find colors that minimize the color differences between the original image and the compressed image. Reducing the number of colors, by taking the average of similar colors, also reduces the size of the image which is what we want.

## Implementing K-means
We start by implementing a function that creates initial points for the centroids. This function takes as input `X`, the training examples, and chooses $K$ distinct points at random.

```python
def initialize_K_centroids(X, K):
    """ Choose K points from X at random """
    m = X.shape[0]
    return X[np.random.choice(m, K, replace=False), :]
```

Then we write a function to find the closest centroid for each training example. This is the first step of the algorith. We take `X` and the `centroids` as input and return the the index of the closest centroid for every example in `c`, an m-dimensional vector.
```python
def find_closest_centroids(X, centroids):
    m = len(X)
    c = np.zeros(m)
    for i in range(m):
        # Find distances
        distances = np.linalg.norm(X[i] - centroids, axis=1)

        # Assign closest cluster to c[i]
        c[i] = np.argmin(distances)

    return c
```

For the second step of the algorithm, we compute the distance of each example to 'its' centroid and take the average of distance for every centroid $$\mu_k$$. Because we're looping over the rows, we have to transpose the examples.
```python
def compute_means(X, idx, K):
    _, n = X.shape
    centroids = np.zeros((K, n))
    for k in range(K):
        examples = X[np.where(idx == k)]
        mean = [np.mean(column) for column in examples.T]
        centroids[k] = mean
    return centroids
```

Finally, we got all the ingredients to complete the K-means algorithm. We set `max_iter`, the number of iterations, to 10. Note that if the centroids aren't moving anymore, we return the results because we cannot optimize any further.
```python
def find_k_means(X, K, max_iters=10):
    centroids = initialize_K_centroids(X, K)
    previous_centroids = centroids
    for _ in range(max_iters):
        idx = find_closest_centroids(X, centroids)
        centroids = compute_means(X, idx, K)
        if centroids == previous_centroids:
            # The centroids aren't moving anymore.
            return centroids, idx
        else:
            previous_centroids = centroids

    return centroids, idx
```

## Getting the image
In case you've never worked with Pillow before, don't worry. The api is very easy.

We start by trying to open the image, which is defined as the first (and last) command line argument like so:
```python
try:
    image_path = sys.argv[1]
    assert os.path.isfile(image_path)
except (IndexError, AssertionError):
    print('Please specify an image')
```

Because we want to get the raw image data, eg the rgb values for each pixel, we create a numpy from the image just like this:
```python
image = load_image(image_path)
w, h, d = image.shape
print('Image found with width: {}, height: {}, depth: {}'.format(w, h, d))
```

Then we get our feature matrix $$X$$. We're reshaping the image because each pixel has the same meaning (color), so they don't have to be presented as a grid.
```python
X = image.reshape((w * h, d))
K = 40 # the number of colors in the image
```

Finally we can make use of our algorithm and get the $$K$$ colors. These colors are chosen by the algorithm.

```python
colors, _ = find_k_means(X, K, max_iters=20)
```

Because the indexes returned by the `find_k_means` function are 1 iteration behind the colors, we compute the indexes for the current colors. Each pixel has a value in ${0...K}$ corresponding, of course, to its color.
```python
idx = find_closest_centroids(X, colors)
```

Once we have all the data required we reconstruct the image by substituting the color index with the color and resphaping the image back to its original dimensions. Then using the Pillow function `Image.fromarray` we convert the raw numbers back to an image. We also convert the indexes to integers because numpy only accepts those as indexes for matrices.
```python
idx = np.array(idx, dtype=np.uint8)
X_reconstructed = np.array(colors[idx, :] * 255, dtype=np.uint8).reshape((w, h, d))
compressed_image = Image.fromarray(X_reconstructed)
```

Finally, we save the image back to the disk like so:
```python
compressed_image.save('out.png')
```

## Testing an image

This is the fun part, testing our program. You can choose any (png) image you want. I use [this image](https://github.com/rickwierenga/PythonImageCompressor/blob/master/image.png) by [Valentin Pinisoara](https://unsplash.com/@vipervaly?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) that I scaled down for speed purposes.

![Compressed image next to uncompressed image](/assets/images/result.png)

The file size was reduced by 71%, from 228kb to 65kb with $$K = 20$$.

To get a better intuition for this algorith, you should try out different values for $$K$$ and `max_iter` yourself.
