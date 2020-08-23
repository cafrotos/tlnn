import * as firebase from 'firebase/app';
import "firebase/analytics";
import "firebase/firestore";
import "firebase/storage"
import { v1 } from 'uuid';
import moment from 'moment'

import firebaseConfigs from 'configs/firebase'

firebase.initializeApp(firebaseConfigs)

export default firebase

const _uniqueFileName = (name) => `${v1()}.${name}`

const _getResourceType = (type) => type.split("/").shift() + "s"

const _uploadResourceFile = async (name, resourceType, file) => {
  const filePath = `${resourceType}/${moment().format("YYYY-MM-DD")}/${_uniqueFileName(name)}`

  const fileRef = firebase.storage().ref().child(filePath)
  await fileRef.put(file)
  const url = await fileRef.getDownloadURL()

  return { path: filePath, url }
}

const _createResource = async (body) => await firebase.firestore().collection("resources").add(body)

const _createStorageMedia = async ({ multimedias }) => {
  const fnsUploadImages = []
  const fnsUploadVideos = []
  const fnsUploadAudios = []

  if (multimedias && multimedias instanceof Array && multimedias.length > 0) {
    multimedias.map(media => {
      const resourceType = _getResourceType(media.type)
      switch (resourceType) {
        case "images":
          fnsUploadImages.push(_uploadResourceFile(media.name, resourceType, media.originFileObj))
          break;
        case "videos":
          fnsUploadVideos.push(_uploadResourceFile(media.name, resourceType, media.originFileObj))
          break;
        case "audios":
          fnsUploadAudios.push(_uploadResourceFile(media.name, resourceType, media.originFileObj))
          break;
        default:
          break;
      }
      return media
    })
    const [images, videos, audios] = await Promise.all([
      Promise.all(fnsUploadImages),
      Promise.all(fnsUploadVideos),
      Promise.all(fnsUploadAudios)
    ])
    return { images, videos, audios }
  }
  return {}
}

export const createResource = async (resource) => {
  const multimedias = await _createStorageMedia(resource)
  await _createResource({
    ...resource,
    multimedias
  })
}