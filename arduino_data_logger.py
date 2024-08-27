# 데이터를 읽을 파일 경로 설정
file_path = 'C:/Users/82109/Desktop/대학/3학년/여름학기/임베디드 소프트웨어 경진대회/output.txt'

# 데이터를 저장할 리스트 생성
data_list = []

# 파일에서 데이터 읽어오기
try:
    with open(file_path, 'r') as file:  # 읽기 모드로 열기
        for line in file:
            # 공백과 ! 문자를 제거하고 데이터만 저장
            cleaned_line = line.strip()
            if cleaned_line.isdigit():  # 데이터가 숫자만 포함하는 경우
                data_list.append(cleaned_line)
except FileNotFoundError:
    print(f"파일을 찾을 수 없습니다: {file_path}")
    exit()  # 파일이 없으면 프로그램 종료

# 데이터를 출력하여 확인
print("읽어온 데이터:", data_list)

# 비정상 데이터를 체크하는 함수 정의 (예: 값이 100 이상이면 비정상)
def check_if_normal(value):
    try:
        value = int(value)
        if value > 100:  # 예: 100 이상이면 비정상
            return "비정상"
        else:
            return "정상"
    except ValueError:
        return "데이터 오류"

# 각 데이터에 대해 정상/비정상 판단
for data in data_list:
    result = check_if_normal(data)
    print(f"데이터: {data} -> 상태: {result}")