export default async function optimizeEmbeddedPngs(code: string, id: string) {
  const pngRegex = /href="data:image\/png;base64,([a-zA-Z0-9+/]+=*)"/gs;
  let modifiedCode = code;
  const matchesIterator = code.matchAll(pngRegex);

  for (const match of matchesIterator) {
    const originalBase64 = match[1];

    if (originalBase64) {
      // This length would indicate  that the match is greater than ~1mb
      if (originalBase64.length > 1000000) {
        const fileName = id.split('/').pop();
        console.warn(
          `\n🚨 You have a large png embedded in ${fileName} - consider using an image tag instead 🚨`
        );
        try {
          const pngBuffer = Buffer.from(originalBase64, 'base64');
          const sharp = (await import('sharp')).default;
          const optimizedBuffer = await sharp(pngBuffer)
            .png({
              quality: 10,
              compressionLevel: 9,
            })
            .toBuffer();
          const optimizedPngBase64 = optimizedBuffer.toString('base64');
          // Construct the new href value
          const originalMatch = match[0];
          const optimizedXlinkHref = originalMatch.replace(
            originalBase64,
            optimizedPngBase64
          );
          // Replace the original href with the optimized one
          modifiedCode = modifiedCode.replace(
            originalMatch,
            optimizedXlinkHref
          );
        } catch (error) {
          console.error(
            'Error processing embedded PNG:',
            error,
            'Original Base64:',
            originalBase64
          );
        }
      }
    }
  }
  return modifiedCode;
}
