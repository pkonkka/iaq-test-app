# Sensoan iaq-test-web-app

Simple test web app testing iaq-rest-api
 
## Introduction

## Installation

## Usage

## UI Structure


| State           | URL                      |  
| --------------- | ------------------------ | 
| sensors         | #/sensors                |       
| newSensor       | #/sensors/new            |       
| editSensor      | #/sensors/:id/edit       |       
| viewSensor      | #/sensors/:id/view       |        
| groups          | #/groups                 |       
| newGroup        | #/groups/new             |       
| editGroup       | #/groups/:id/edit        |       
| viewGroup       | #/groups/:id/view        |       


                      
 | TO\FROM         | sensors | newSensor | editSensor | viewSensor | groups | newGroup | editGroup | viewGroup | 
 | --------------- | ------- | --------- | ---------- | ---------- | ------ | -------- | --------- | --------- | 
 | sensors         |         |     x     |            |     x      |    x   |          |           |           |      
 | newSensor       |   x     |           |            |            |        |          |           |           | 
 | editSensor      |         |           |            |     x      |        |          |           |           |    
 | viewSensor      |         |     x     |      x     |            |        |          |           |           |          
 | groups          |   x     |           |            |            |        |     x    |     x     |     x     |  
 | newGroup        |         |           |            |            |    x   |          |           |           |  
 | editGroup       |         |           |            |            |    x   |          |           |     x     |  
 | viewGroup       |         |           |            |            |    x   |          |           |           |   
 

