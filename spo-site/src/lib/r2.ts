import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

let _client: S3Client | null = null

function getR2Config() {
  const accountId = process.env.R2_ACCOUNT_ID
  const accessKeyId = process.env.R2_ACCESS_KEY_ID
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
  const bucket = process.env.R2_BUCKET
  const publicUrl = process.env.R2_PUBLIC_URL

  if (!accountId || !accessKeyId || !secretAccessKey || !bucket || !publicUrl) {
    throw new Error(
      "R2 não configurado. Defina R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET e R2_PUBLIC_URL."
    )
  }
  return { accountId, accessKeyId, secretAccessKey, bucket, publicUrl }
}

export function getR2Client(): S3Client {
  if (_client) return _client
  const { accountId, accessKeyId, secretAccessKey } = getR2Config()
  _client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  })
  return _client
}

export async function uploadToR2(params: {
  key: string
  body: ArrayBuffer | Uint8Array | Blob | string
  contentType: string
}): Promise<{ url: string }> {
  const { bucket, publicUrl } = getR2Config()
  const client = getR2Client()
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: params.key,
    Body: params.body as never,
    ContentType: params.contentType,
  })
  await client.send(command)
  return { url: `${publicUrl.replace(/\/$/, "")}/${params.key}` }
}

export async function deleteFromR2(key: string): Promise<void> {
  const { bucket } = getR2Config()
  const client = getR2Client()
  const command = new DeleteObjectCommand({
    Bucket: bucket,
    Key: key,
  })
  await client.send(command)
}

export async function getPresignedUploadUrl(params: {
  key: string
  contentType: string
  expiresIn?: number
}): Promise<{ url: string; key: string }> {
  const { bucket, publicUrl } = getR2Config()
  const client = getR2Client()
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: params.key,
    ContentType: params.contentType,
  })
  const url = await getSignedUrl(client, command, {
    expiresIn: params.expiresIn ?? 600,
  })
  return {
    url,
    key: params.key,
  }
}

export function buildPublicUrl(key: string): string {
  const { publicUrl } = getR2Config()
  return `${publicUrl.replace(/\/$/, "")}/${key}`
}
