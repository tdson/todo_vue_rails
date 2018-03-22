2.times {|n| Task.create! name: "Simple task #{n + 1}", is_done: true}
3.times {|n| Task.create! name: "Simple task #{n + 3}"}
