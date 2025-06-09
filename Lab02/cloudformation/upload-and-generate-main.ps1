# Định nghĩa biến
# $bucketName = "nhom16-bucket"
$profile_value = "Cutelovely"

$bucketName = "ttvkcgt"   # tên bucket S3 
$folder = "cloudformation"      # thư mục chứa file YAML

# Đường dẫn đầy đủ đến folder/ tùy chỉnh nha
$baseFolder = "D:\New folder\NT548(DEVOPS)\NT548-DevOps-ThucHanh\Lab02\cloudformation"
$templateFolder = Join-Path $baseFolder "templates"   # Folder chứa các file *.yml con
# Các file template con
$files = @("vpc.yml", "nat-gateway.yml", "security-groups.yml", "route-tables.yml", "ec2.yml")

# Hashtable để lưu URL S3 tương ứng file
$s3Links = @{}

# Upload từng file lên S3
foreach ($file in $files) {
    $localFile = Join-Path $templateFolder  $file
    Write-Host "Uploading $file ..."
    
    # Lệnh upload file lên S3 (đè nếu đã tồn tại)
    # aws s3 cp $localFile "s3://$bucketName/$file" --acl public-read
    if ($profile_value -ne "") {
        aws s3 cp $localFile "s3://$bucketName/$file" --profile $profile_value
    } else {
        aws s3 cp $localFile "s3://$bucketName/$file"
    }


    # Lấy link file S3 công khai
    $url = "https://$bucketName.s3.amazonaws.com/$file"
    
    # Lưu vào bảng để thay thế
    $key = $file -replace ".yml", ""  # ví dụ: vpc.yml -> vpc
    $s3Links[$key] = $url
}

# Đọc file main-template.yml có placeholder
$mainTemplatePath = Join-Path $baseFolder "main-template.yml"
$mainContent = Get-Content $mainTemplatePath -Raw

# Thay thế placeholder bằng link S3 thật
foreach ($key in $s3Links.Keys) {
    $placeholder = "{{" + $key + "}}"
    $mainContent = $mainContent -replace [regex]::Escape($placeholder), $s3Links[$key]
}

# Ghi ra file main.yml mới
$outputPath = Join-Path $baseFolder "main.yml"
Set-Content -Path $outputPath -Value $mainContent

Write-Host "Done! File main.yml has been created with the correct S3 link."
