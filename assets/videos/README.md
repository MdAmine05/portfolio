Place your video file here as: boutique-vetements.mp4

Recommended: keep it under 20-30MB and compressed (H.264, 720p) so the
page stays fast to load. If you have ffmpeg, you can compress with:

  ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset veryslow \
    -vf scale=1280:-2 -acodec aac -b:a 128k boutique-vetements.mp4
