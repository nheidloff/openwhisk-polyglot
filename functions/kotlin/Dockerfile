FROM openjdk:8-alpine3.7
ADD kotlin/build/libs/openwhisk-1.0-SNAPSHOT.jar openwhisk-1.0-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "openwhisk-1.0-SNAPSHOT.jar"]