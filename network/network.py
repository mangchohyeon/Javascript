import itertools

#road 클래스 선언
class func:
  def __init__(self) :
    self.formula = ""

  #입력받은 함수에다 x대입해서 반환하는 함수
  def fx(self,x) :
    if(x == 0) :
      return 0

    else :
      try :
        self.formula = int(self.formula)
        return self.formula
      except ValueError:
        r = int(eval(self.formula))
        return r


#main

car_list = []
func_list = []
time_list = []

road_num = int(input("도로의 수를 입력하세요 : "))

for i in range(1,road_num+1) :
  t = func()

  print(f"{i}번째 도로에서 차가 x대 갈때 걸리는 시간(f(x))를 입력하시오")
  temp = str(input())
  temp.replace('^','**')
  for i in range(len(temp)) :
    if(temp[i] == 'x') :
      try :
        temp.replace(temp[i-1],temp[i-1]+'*')
      except ValueError :
        pass

  t.formula = temp
  func_list.append(t)

car_num = int(input("차의 수를 입력하세요 : "))
print("")

# combinations_with_replacement로 중복을 허용하는 조합을 구합니다.
for comb in itertools.combinations_with_replacement(range(car_num+1), road_num):
  # 각 조합의 합이 car_num인 경우만 필터링
  if sum(comb) == car_num:
    # comb에서 가능한 모든 순열을 구하여 result에 추가
    car_list.extend(itertools.permutations(comb))

# 중복 순열을 제거하기 위해 set으로 변환하고 다시 리스트로 변환
car_list = list(set(car_list))

for car_numb in car_list  :
  time = 0
  for i in range(road_num) :
    time += car_numb[i]*(func_list[i].fx(car_numb[i]))

  r = [time,car_numb]
  time_list.append(r)

time_list.sort(key = lambda x:x[0])

for ary in time_list :
  time = time_list[0][0]
  if(ary[0] != time) :
    break

  for i in range(road_num) :
    if(i == (road_num -1)) :
      print(f"{i+1}번째 도로에 차가 {ary[1][i]}대 갈 때")
      continue
    print(f"{i+1}번째 도로에 차가 {ary[1][i]}대,")

  print(f"시간의 총합이 {ary[0]}로 가장 적습니다.")
  print("")

