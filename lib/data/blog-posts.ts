"use client"

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  category: string
  tags: string[]
  readingTime: number
  featured: boolean
  image: string
  slug: string
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building a Transformer Model from Scratch: LLaMA Architecture Explained",
    excerpt:
      "A deep dive into the architecture of LLaMA, a state-of-the-art language model, with implementation details and code examples.",
    content: `# Building a Transformer Model from Scratch: LLaMA Architecture Explained

Large Language Models (LLMs) have revolutionized natural language processing, with models like LLaMA pushing the boundaries of what's possible. In this article, we'll explore the architecture of LLaMA and implement key components from scratch.

## Understanding the Transformer Architecture

The foundation of LLaMA is the transformer architecture, which relies on self-attention mechanisms to process sequential data efficiently.

### Self-Attention Mechanism

The self-attention mechanism allows the model to weigh the importance of different words in a sentence:

\`\`\`python
def self_attention(query, key, value, mask=None):
    # Scaled dot-product attention
    d_k = query.size(-1)
    scores = torch.matmul(query, key.transpose(-2, -1)) / math.sqrt(d_k)
    
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)
    
    attention_weights = F.softmax(scores, dim=-1)
    output = torch.matmul(attention_weights, value)
    
    return output, attention_weights
\`\`\`

## Conclusion

This face recognition system demonstrates how to combine multiple computer vision techniques to create a robust identification system. The modular design allows for easy improvements and customization based on specific requirements.

Key takeaways:
- MTCNN provides reliable face detection
- Face alignment improves recognition accuracy
- FaceNet embeddings enable efficient face comparison
- Real-time processing requires careful optimization`,
    author: "Antony Austin",
    publishedAt: "2024-05-15",
    category: "Machine Learning",
    tags: ["Transformers", "LLMs", "PyTorch", "NLP", "AI", "Deep Learning"],
    readingTime: 15,
    featured: true,
    image: "/placeholder.svg?height=400&width=800",
    slug: "building-transformer-model-from-scratch",
  },
  {
    id: "2",
    title: "Ambulance Traffic Management System: Real-time Emergency Vehicle Routing",
    excerpt:
      "A comprehensive guide to designing and implementing an IoT-based traffic management system for emergency vehicles using embedded systems.",
    content: `# Ambulance Traffic Management System: Real-time Emergency Vehicle Routing

Emergency response time is critical in life-threatening situations. This article details the design and implementation of an IoT-based traffic management system that prioritizes ambulances through traffic signals.

## System Architecture

The system consists of four main components:

1. **Vehicle Unit**: Installed in ambulances
2. **Traffic Signal Controller**: Installed at intersections
3. **Central Monitoring System**: For tracking and coordination
4. **Mobile Application**: For paramedics and traffic operators

### Vehicle Unit Design

The vehicle unit uses GPS for location tracking and RF communication for signal control:

\`\`\`cpp
#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <RH_ASK.h>
#include <SPI.h>

// GPS setup
TinyGPSPlus gps;
SoftwareSerial gpsSerial(4, 3); // RX, TX

// RF transmitter setup
RH_ASK driver(2000, 11, 12); // Speed, RX, TX

struct VehicleData {
  float latitude;
  float longitude;
  uint8_t vehicleID;
  uint8_t emergencyLevel; // 1-3, with 3 being highest priority
};

void setup() {
  Serial.begin(9600);
  gpsSerial.begin(9600);
  
  if (!driver.init())
    Serial.println("RF init failed");
}

void loop() {
  // Update GPS data and transmit emergency signals
  delay(1000);
}
\`\`\`

## System Testing and Results

We tested the system in a controlled environment with the following results:

| Metric | Without System | With System | Improvement |
|--------|---------------|------------|-------------|
| Average Response Time | 12.3 minutes | 8.1 minutes | 34.1% |
| Traffic Signal Compliance | 78% | 96% | 23.1% |
| Route Optimization | Manual | Automatic | N/A |
| Real-time Tracking | No | Yes | N/A |

## Conclusion

The ambulance traffic management system demonstrates significant improvements in emergency response times. By integrating IoT devices, real-time data processing, and intelligent routing algorithms, we can create a system that potentially saves lives by reducing delays in emergency medical services.`,
    author: "Antony Austin",
    publishedAt: "2024-04-22",
    category: "Embedded Systems",
    tags: ["IoT", "Arduino", "ESP8266", "GPS", "Traffic Management", "Emergency Systems"],
    readingTime: 18,
    featured: true,
    image: "/placeholder.svg?height=400&width=800",
    slug: "ambulance-traffic-management-system",
  },
  {
    id: "3",
    title: "Face Recognition with OpenCV and Deep Learning: A Practical Guide",
    excerpt:
      "Learn how to implement a robust face recognition system using OpenCV, deep learning, and Python with this step-by-step tutorial.",
    content: `# Face Recognition with OpenCV and Deep Learning: A Practical Guide

Face recognition technology has evolved significantly in recent years, becoming more accessible to developers. This guide walks through building a complete face recognition system using OpenCV and deep learning techniques.

## Understanding Face Recognition Pipeline

A typical face recognition system involves four key steps:

1. **Face Detection**: Locating faces in an image
2. **Face Alignment**: Normalizing facial geometry
3. **Feature Extraction**: Converting faces to numerical representations
4. **Face Matching**: Comparing face embeddings

### Face Detection with MTCNN

Multi-task Cascaded Convolutional Networks (MTCNN) is a state-of-the-art face detection algorithm:

\`\`\`python
import cv2
import numpy as np
from mtcnn import MTCNN

def detect_faces(image_path):
    # Load image
    image = cv2.imread(image_path)
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    # Initialize MTCNN detector
    detector = MTCNN()
    
    # Detect faces
    faces = detector.detect_faces(image_rgb)
    
    return image, faces

# Example usage
image, faces = detect_faces('group_photo.jpg')
print(f"Detected {len(faces)} faces")
\`\`\`

## Conclusion

This face recognition system demonstrates how to combine multiple computer vision techniques to create a robust identification system. The modular design allows for easy improvements and customization based on specific requirements.

Key takeaways:
- MTCNN provides reliable face detection
- Face alignment improves recognition accuracy
- FaceNet embeddings enable efficient face comparison
- Real-time processing requires careful optimization`,
    author: "Antony Austin",
    publishedAt: "2024-03-10",
    category: "Computer Vision",
    tags: ["OpenCV", "Deep Learning", "Python", "Face Recognition", "MTCNN", "FaceNet"],
    readingTime: 16,
    featured: false,
    image: "/placeholder.svg?height=400&width=800",
    slug: "face-recognition-opencv-deep-learning",
  },
  {
    id: "4",
    title: "ESP8266 Home Automation: IoT Control with Cloud Integration",
    excerpt:
      "Build a comprehensive home automation system using ESP8266, sensors, and cloud services for remote monitoring and control.",
    content: `# ESP8266 Home Automation: IoT Control with Cloud Integration

Home automation has become increasingly accessible with the advent of affordable microcontrollers like the ESP8266. This guide demonstrates how to build a complete IoT home automation system with cloud integration.

## System Architecture Overview

Our home automation system consists of:

1. **ESP8266 Nodes**: Distributed sensors and actuators
2. **MQTT Broker**: Message communication hub
3. **Cloud Database**: Data storage and analytics
4. **Mobile App**: Remote control interface
5. **Web Dashboard**: Real-time monitoring

### Main Controller Node

\`\`\`cpp
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <DHT.h>

// WiFi credentials
const char* ssid = "YourWiFiNetwork";
const char* password = "YourWiFiPassword";

// MQTT broker settings
const char* mqtt_server = "your-mqtt-broker.com";
const int mqtt_port = 1883;

// Pin definitions
#define DHT_PIN 2
#define DHT_TYPE DHT22
#define RELAY_1 4  // Living room lights

// Initialize sensors
DHT dht(DHT_PIN, DHT_TYPE);

void setup() {
  Serial.begin(115200);
  
  // Initialize pins
  pinMode(RELAY_1, OUTPUT);
  
  // Initialize sensors
  dht.begin();
  
  Serial.println("Home Automation System Started");
}

void loop() {
  // Read sensors and control devices
  delay(1000);
}
\`\`\`

## Cloud Integration

The system integrates with Firebase for real-time data storage and device control through MQTT messaging.

## Conclusion

This comprehensive home automation system demonstrates the power of combining ESP8266 microcontrollers with cloud services. The system provides real-time sensor monitoring, remote device control, and automated responses based on environmental conditions.`,
    author: "Antony Austin",
    publishedAt: "2024-02-18",
    category: "IoT",
    tags: ["ESP8266", "IoT", "Home Automation", "MQTT", "Firebase", "React Native"],
    readingTime: 22,
    featured: false,
    image: "/placeholder.svg?height=400&width=800",
    slug: "esp8266-home-automation-iot-cloud",
  },
  {
    id: "5",
    title: "Solar Tracking Systems: Dual-Axis Control with PID Implementation",
    excerpt:
      "Design and build an intelligent dual-axis solar tracking system using servo motors, light sensors, and PID control for maximum energy efficiency.",
    content: `# Solar Tracking Systems: Dual-Axis Control with PID Implementation

Solar energy efficiency can be significantly improved with proper sun tracking. This article details the design and implementation of a dual-axis solar tracking system that increases energy generation by up to 35% compared to fixed installations.

## System Overview

Our dual-axis solar tracker consists of:

1. **Mechanical Structure**: Dual-axis gimbal system
2. **Sensor Array**: Light-dependent resistors (LDRs) for sun position detection
3. **Control System**: Arduino-based controller with PID algorithms
4. **Actuators**: High-torque servo motors for precise positioning
5. **Safety Systems**: Weather protection and emergency stop mechanisms

### Hardware Design

The mechanical design uses a gimbal system for smooth dual-axis movement:

\`\`\`cpp
// Servo motor control for dual-axis tracking
#include <Servo.h>
#include <PID_v1.h>

// Servo objects
Servo azimuthServo;  // Horizontal rotation (0-360°)
Servo elevationServo; // Vertical tilt (0-90°)

// Pin definitions
#define AZIMUTH_SERVO_PIN 9
#define ELEVATION_SERVO_PIN 10
#define LDR_TOP_LEFT A0
#define LDR_TOP_RIGHT A1

// Current positions
double azimuthPosition = 90;  // Current azimuth angle (0-180°)
double elevationPosition = 45; // Current elevation angle (0-90°)

// PID controllers
PID azimuthPID(&azimuthPosition, &azimuthOutput, &azimuthTarget, 2, 5, 1, DIRECT);
PID elevationPID(&elevationPosition, &elevationOutput, &elevationTarget, 2, 5, 1, DIRECT);

void setup() {
  Serial.begin(9600);
  
  // Initialize servos
  azimuthServo.attach(AZIMUTH_SERVO_PIN);
  elevationServo.attach(ELEVATION_SERVO_PIN);
  
  // Initialize PID controllers
  azimuthPID.SetMode(AUTOMATIC);
  elevationPID.SetMode(AUTOMATIC);
  
  Serial.println("Dual-Axis Solar Tracker Initialized");
}

void loop() {
  // Perform light tracking
  performLightTracking();
  delay(100);
}
\`\`\`

## Performance Results

After extensive testing, our dual-axis solar tracking system achieved:

- **Fixed Panel**: 4.2 kWh/day average
- **Single-Axis Tracker**: 5.1 kWh/day average (+21.4%)
- **Dual-Axis Tracker**: 5.6 kWh/day average (+33.3%)

## Conclusion

The dual-axis solar tracking system demonstrates significant improvements in energy generation efficiency. The combination of light-based tracking, astronomical calculations, and weather protection creates a robust system suitable for residential and commercial applications.`,
    author: "Antony Austin",
    publishedAt: "2024-01-25",
    category: "Renewable Energy",
    tags: ["Solar Energy", "Arduino", "Servo Control", "PID Control", "Renewable Energy", "Automation"],
    readingTime: 20,
    featured: false,
    image: "/placeholder.svg?height=400&width=800",
    slug: "solar-tracking-systems-dual-axis-control",
  },
]

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug)
}

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter((post) => post.featured)
}

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter((post) => post.category === category)
}

export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter((post) => post.tags.includes(tag))
}

export const getAllCategories = (): string[] => {
  return Array.from(new Set(blogPosts.map((post) => post.category)))
}

export const getAllTags = (): string[] => {
  const tags = new Set<string>()
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags)
}
